import { createContext, useContext, useState, useEffect } from "react";
import { addProductos, getProductos, editarProductos , eliminarProductos , NotificacionProducto} from '../api/productos'; // Importa la función editarProductos
import Swal from 'sweetalert2';

const ProductoContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductoContext);

  if (!context) {
    throw new Error('useProductos must be used within a ProductoProvider');
  }

  return context;
};

export function ProductoProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [notificaciones, setNotificaciones] = useState(null)

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
        const res = await getProductos();
        setProductos(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  

  const crearProducto = async (formData) => {
    try {
      const res = await addProductos(formData);
      console.log(res);
      showAlert('Agregado un producto', '', 'success');
      setProductos([...productos, res.data]);
    } catch (error) {
      console.log(error);
      showAlert('Error de registro', 'Hubo un error durante el registro.', 'error');
    }
  }

  const editarProducto = async (id, formData) => {
    try {
      const res = await editarProductos(id, formData);
      console.log(res);
      showAlert('Producto actualizado', '', 'success');
      setProductos((prevProductos) => {
        const updatedProductos = prevProductos.map((producto) => {
          if (producto._id === id) {
            return { ...producto, ...formData };
          }
          return producto;
        });
        return updatedProductos;
      });
    } catch (error) {
      console.log(error);
      showAlert('Error al editar producto', 'Hubo un error durante la edición.', 'error');
    }
  }
  

  const deleteProductos = async (productoId)=>{
    try {
      const res = await eliminarProductos (productoId);
      setProductos(productos.filter(producto=>producto._id !== productoId));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }


  const getImageUrl = (producto) => {
    return 'http://localhost:4001/uploads/' + producto.Urlimagen;
    
  };

  useEffect(() => {
    const mostrarNoti = async () => {
      try {
        const res = await NotificacionProducto();
        console.log(res);
        setNotificaciones(res.data); // Actualiza el estado de notificaciones
        if (res.data && res.data.productos && res.data.productos[0] && res.data.productos[0].AvisoAdmi) {
          console.log('AvisoAdmi es true');
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    mostrarNoti();
  }, []);

  return (
    <ProductoContext.Provider value={{
      productos,
      getProductos,
      getImageUrl,
      crearProducto,
      editarProducto,
      deleteProductos,
      notificaciones
      

    }}>
      {children}
    </ProductoContext.Provider>
  );
}
