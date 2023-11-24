import axios from './axios';

// Modifica la función addAlaCompraEfectivo en tu frontend
export const addAlaCompraEfectivo = (compra) => axios.post('/compra', compra);


//ruta de mercado pago con el id del usuario
export const comprarProductos = ({ userId, direccion, tipoPago }) => axios.post(`/create-order/${userId}`, { direccion, tipoPago });




export const  pedidosCompra = (userId) => axios.get(`/pedidos-pagados/${userId}`);

export const  TodospedidosCompra = () => axios.get(`/pedidos-pagados/`);