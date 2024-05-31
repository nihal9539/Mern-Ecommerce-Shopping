import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/cart" })

export const addToCart = (id, formData) => API.post(`/add/${id}`, formData)
export const getUserCart = (userId) => API.get(`/get/${userId}`)
export const removeFromCart = (userId, productId,size) => API.delete(`/remove/${userId}/${productId}/${size}`)