import axios from './axios';

export const getProductos = () => axios.get(`/productos`);

export const NotificacionProducto = () => axios.get(`/productosEstado`);

export const addProductos = (formData) => axios.post('/productos', formData);

export const editarProductos = (id, formData) => axios.put(`/productos/${id}`, formData);

export const eliminarProductos = (id) => axios.delete(`/productos/${id}`);



