const mercadopago = require('mercadopago');
const { MERCADOPAGO_API_KEY } = require('../config/config');
require('dotenv').config({ path: 'variables.env' });

const Cart = require('../models/Cart');
const Pedido = require('../models/Pedido');
const Producto = require('../models/Productos');
const Usuario = require('../models/Usuarios');

exports.crearOrden = async (req, res) => {
    try {
        const userId = req.params.userId;
        const productos = await Cart.find({ user: userId });
        const direccion = req.body.direccion;
        const tipoPago = req.body.tipoPago;

        const usuario = await Usuario.findById(userId);
        const nombreUsuario = usuario.Nombre;
        const telefono = usuario.Telefono;

        if (productos.length === 0) {
            return res.status(400).json({ error: 'No hay productos en el carrito.' });
        }

        const total = productos.reduce((acc, producto) => {
            return acc + producto.Precio * producto.Cantidad;
        }, 0);

        // Actualizar stock y ventas realizadas
        for (const producto of productos) {
          console.log("Nombre del producto:", producto.Nombre);
          console.log("Cantidad a restar:", producto.Cantidad);
    
          try {
            // Verificar si el producto existe
            const productoExistente = await Producto.findOne({ Nombre: producto.Nombre });
    
            if (!productoExistente) {
              console.error(`No se encontró el producto con el nombre: ${producto.Nombre}`);
              continue;  // Saltar al siguiente producto en caso de no encontrarlo
            }
    
            // Verificar si hay suficientes unidades disponibles para restar
            if (productoExistente.Cantidad < producto.Cantidad) {
              console.error(`No hay suficientes unidades disponibles para el producto: ${producto.Nombre}`);
              continue;  // Saltar al siguiente producto en caso de no haber suficientes unidades
            }
    
            // Actualizar el stock y las ventas realizadas
            const productoActualizado = await Producto.findOneAndUpdate(
              { Nombre: producto.Nombre },
              {
                $inc: {
                  Cantidad: -producto.Cantidad,
                  VentasRealizadas: producto.Cantidad,
                },
              },
              { new: true }
            );
    
            if (!productoActualizado) {
              console.error(`No se pudo actualizar el stock para el producto: ${producto.Nombre}`);
            }
    
            console.log("Producto actualizado:", productoActualizado);
    
            productosActualizados.push(productoActualizado);
          } catch (error) {
            console.error(`Error al actualizar el producto con nombre ${producto.Nombre}:`, error);
          }
        }

        const items = productos.map((producto) => {
            return {
                id: producto._id,
                title: producto.Nombre,
                quantity: producto.Cantidad,
                currency_id: 'COP',
                unit_price: producto.Precio,
            };
        });

        mercadopago.configure({
            access_token: MERCADOPAGO_API_KEY,
        });

        const result = await mercadopago.preferences.create( {
          items: items,
          back_urls: {
            success: 'http://localhost:5173/',
            failure: 'http://localhost:4001/failure',
            pending: '',
          },
          notification_url: 'https://d1ef-2800-484-9c75-4f00-84ce-887a-2098-c5c1.ngrok.io/webhook',
          auto_return: 'approved',
          binary_mode: true,
        } );
        // Crear el pedido en la base de datos antes de enviar la respuesta
        const nuevoPedido = new Pedido({
          user: userId,
          nombreUsuario: nombreUsuario,
          telefono:telefono,  // Agregar el nombre del usuario
          productos: productos.map((producto) => ({
              producto: producto._id,
              cantidad: producto.Cantidad,
              precio: producto.Precio,
              nombre: producto.Nombre,
              urlimagen: producto.Urlimagen,
          })),
          direccion: direccion,
          tipoPago: tipoPago,
          total: total,
      });

        // Guardar el nuevo pedido en la base de datos
        await nuevoPedido.save();
        await Cart.deleteMany({ user: userId });

        console.log(result);
        res.send(result.body);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

exports.recibirWebhook = async (req, res) => {
    const payment = req.query;

    try {
        if (payment.type === 'payment') {
            const data = await mercadopago.payment.findById(payment['data.id']);
            console.log('External Reference:', data.external_reference);

            // Actualizar el estado del pedido en la base de datos a 'pagado'
            const pedidoActualizado = await Pedido.findByIdAndUpdate(data.external_reference, { estado: 'pagado' });

            console.log('Pedido Actualizado:', pedidoActualizado);

            if (!pedidoActualizado) {
                throw new Error('No se pudo encontrar el pedido para actualizar.');
            }
            console.log(data);
        }
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};