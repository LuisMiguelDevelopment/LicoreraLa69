import axios from './axios';

export const profileRequest = (id)=> axios.get(`/profile/${id}`);
export const verifyTokenRequest = () => axios.get(`/verify`);
export const registerRequest = user => axios.post(`/register`, user);
export const loginRequest = user => axios.post(`/login`, user);
export const logoutRequest = user => axios.post(`/logout`, user);
export const editarPerfilRequest = (id , formData) => axios.put(`/editarPerfil/${id}` ,formData);
