import axios from "axios";
import useToken from "../hooks/useToken"

const API = axios.create({ baseURL: "http://localhost:5000/cart" })
const {headers} = useToken()
API.interceptors.request.use(
  config => {
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const addToCart = (id, formData) => API.post(`/add/${id}`, formData,)
export const getUserCart = (userId) => API.get(`/get/${userId}`)
export const removeFromCart = (userId, productId, size) => API.delete(`/remove/${userId}/${productId}/${size}`,)
export const cartQuantityUpdate = (userId, productId, size, quantity) => API.put(`/change-product-quantity/${userId}/${productId}/${size}/${quantity}`,{headers})