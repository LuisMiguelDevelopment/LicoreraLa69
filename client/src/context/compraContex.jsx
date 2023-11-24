// context/compraContext.js
import { createContext, useContext, useState } from "react";
import { comprarProductos , addAlaCompraEfectivo , pedidosCompra , TodospedidosCompra} from "../api/compra";
import Swal from 'sweetalert2';
const CompraContext = createContext();

export const useCompra = () => {
  const context = useContext(CompraContext);

  if (!context) {
    throw new Error('useCompra must be used within a CompraProvider');
  }

  return context;
};

export function CompraProvider({ children }) {
  const [compras, setCompras] = useState([]);
  const  [ direccion , setDireccion] = useState("");
  const [precioTotal , setPrecioTotal] = useState(0);


  const showAlert = (title, text, icon) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon
    });
}


  const comprarProductoss = async (userId, direccion, tipoPago) => {
    try {
      // Lógica para realizar la compra en el servidor con MercadoPago
      const res = await comprarProductos({ userId, direccion, tipoPago });

  
      // Almacena la información completa de la compra en el estado
      setCompras([...compras, res.data]);
  
      // Almacena la ubicación de la URL de MercadoPago
      const initPoint = res.data.init_point;
  
      // Redirige a MercadoPago
      window.location.href = initPoint;
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
  };

  const calcularPrecioTotal = (productos)=>{
    const total = productos.reduce((acc , producto)=>{
      return acc + producto.precio * producto.Cantidad;
    },0)
    setPrecioTotal(total);
  }
  

  const comprarEfectivo = async (efectivo) => {
    try {
      // Incluye la dirección en la solicitud
      const res = await addAlaCompraEfectivo({ ...efectivo, Direccion: direccion });
      console.log(res);
      showAlert('Registro exitoso', '¡Te has registrado correctamente!', 'success');

    } catch (error) {
      console.error(error);
    }
  };


  const obtenerCompras = async (userId) => {
    try {
    
      const res = await pedidosCompra(userId);

        setCompras(res.data.pedidos);
        console.log(res.data)
        return res.data.pedidos;
    
    } catch (error) {
      console.error('Error al obtener compras:', error);
      return [];
    }
  };


  const todosLosPedidos = async ()=>{
    try {
      const res = await TodospedidosCompra();
      console.log(res.data);
      return res.data.pedidos;
    } catch (error) {
      console.log(error);
    }
  }



  const getImageUrl = (pedido) => {
    return 'http://localhost:4001/uploads/' + pedido.urlimagen;
  };

  return (
    <CompraContext.Provider
      value={{
        compras,
        comprarProductoss,
        comprarEfectivo,
        setDireccion,
        obtenerCompras,
        getImageUrl,
        calcularPrecioTotal,
        todosLosPedidos
      }}
    >
      {children}
    </CompraContext.Provider>
  );
}
