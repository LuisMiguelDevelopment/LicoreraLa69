const Pedido = require("../models/Pedido");
const Cart = require("../models/Cart");
const Producto = require("../models/Productos");
const Usuario = require("../models/Usuarios");

exports.getCompra = async (req, res) => {
  try {
    if (req.user) {
      const compras = await Pedido.find({
        user: req.user.id
      });

      if (compras.length > 0) {
        res.json({ compras });
      } else {
        res.json({ msg: "No se hizo ninguna compra" });
      }
    } else {
      res.status(401).json({ msg: "Usuario no autenticado" });
    }
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
}

exports.addAlaCompra = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ msg: "Usuario no autenticado" });
    }

    const { userId, direccion, carritos, tipoPago } = req.body;

    const usuario = await Usuario.findById(userId);
    const nombreUsuario = usuario.Nombre;
    const telefono = usuario.Telefono;


    console.log("Datos del cuerpo de la solicitud:", req.body);

    const totalfinal = carritos.reduce((acc, producto) => {
      return acc + producto.Precio * producto.Cantidad;
    }, 0);

    const productosActualizados = [];

    // Actualizar stock y ventas realizadas
    for (const producto of carritos) {
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

    // Crear un nuevo pedido para agrupar los elementos del carrito
    const productosPedido = carritos.map(producto => ({
      producto: producto._id,
      cantidad: producto.Cantidad,
      precio: producto.Precio,
      nombre: producto.Nombre,
      urlimagen: producto.Urlimagen,
    }));

    const nuevoPedido = new Pedido({
      user: userId,
      productos: productosPedido,
      direccion: direccion,
      tipoPago: tipoPago,
      total: totalfinal,
      nombreUsuario:nombreUsuario,
      telefono:telefono
    });

    // Guardar el pedido en la base de datos
    await nuevoPedido.save();

    // Limpia el carrito después de realizar las compras
    await Cart.deleteMany({ user: userId });

    res.json({ msg: 'Las compras se realizaron correctamente', productosActualizados });
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
