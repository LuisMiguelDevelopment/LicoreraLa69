import { createContext, useContext, useState, useEffect } from 'react';
import { getCarritos, addCarrito, putCarrito } from '../api/carrito.js';
import Swal from 'sweetalert2';

const CarritoContext = createContext();

export const useCarritos = () => {
  const context = useContext(CarritoContext);

  if (!context) {
    throw new Error('useCarritos debe utilizarse dentro de CarritoProvider');
  }

  return context;
};

export function CarritoProvider({ children }) {
  const [carritos, setCarritos] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [isUpdatingCart, setIsUpdatingCart] = useState(false);


  const showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCarritos();
        if (Array.isArray(res.data.productosCart)) {
          setCarritos(res.data.productosCart);
          calcularPrecioTotal(res.data.productosCart);
          console.log(res)
        } else {
          console.log('productosCart no es un array válido en la respuesta:', res.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const addCarrito2 = async (carrito) => {
    try {
      const res = await addCarrito(carrito);
      console.log(res);
      showAlert('Agregado al carrito', '', 'success');

      const updatedCarritosResponse = await getCarritos();
      if (Array.isArray(updatedCarritosResponse.data.productosCart)) {
        const updatedCarritos = updatedCarritosResponse.data.productosCart;
        setCarritos(updatedCarritos);
        calcularPrecioTotal(updatedCarritos);
      } else {
        console.log('productosCart no es un array válido en la respuesta:', updatedCarritosResponse.data);
      }
    } catch (error) {
      console.error(error);
      showAlert('Tienes que iniciar sesion', '', 'error');
    }
  };
  const calcularPrecioTotal = (productos) => {
    const total = productos.reduce((acc, producto) => {
      return acc + producto.Precio * producto.Cantidad;
    }, 0);
    setPrecioTotal(total);
  };

  const actualizarCart = async (productoId, query, body) => {
    if (isUpdatingCart) {
      return;
    }

    try {
      setIsUpdatingCart(true);
      const res = await putCarrito(productoId, query, body);

      if (res.data && res.data.msg === 'El producto fue actualizado') {
        console.log('hola');
      } else {
        const body = {
          Cantidad: query === 'add' ? 1 : -1,
        };
        const updatedCarritos = carritos.map((carrito) => {
          if (carrito._id === productoId) {
            return {
              ...carrito,
              Cantidad: carrito.Cantidad + body.Cantidad,
            };
          }
          return carrito;
        });
        setCarritos(updatedCarritos);
        calcularPrecioTotal(updatedCarritos);
      }
    } catch (error) {
      console.error('Error al actualizar el carrito', error);
    } finally {
      setIsUpdatingCart(false);
    }
  };

  const getImageUrl = (carrito) => {
    return 'http://localhost:4001/uploads/' + carrito.Urlimagen;
  };

  useEffect(() => {
    const carritosFiltrados = carritos.filter((carrito) => carrito.Cantidad > 0);

    if (carritosFiltrados.length !== carritos.length) {
      setCarritos(carritosFiltrados);
      calcularPrecioTotal(carritosFiltrados);
    }
  }, [carritos]);

  return (
    <CarritoContext.Provider
      value={{
        carritos,
        precioTotal,
        getImageUrl,
        addCarrito2,
        actualizarCart,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
