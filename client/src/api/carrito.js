import axios from "./axios";

export const getCarritos = () => axios.get(`/carrito`);

export const addCarrito = (carrito) => axios.post(`/carrito`, carrito);

export const putCarrito = (productoId, query, carrito) => {
    return axios.put(`/carrito/${productoId}?query=${query}`, carrito);
  };


