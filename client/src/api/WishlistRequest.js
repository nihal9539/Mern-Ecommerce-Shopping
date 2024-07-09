import axios from "axios"
import useToken from "../hooks/useToken";

const API = axios.create({ baseURL: "http://localhost:5000/wishlist" })
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


export const createWishlist = (id, data) => API.post(`/${id}`, {product:data})
export const getWishlist = (id) => API.get(`/find/${id}`)
export const removeFromWishlist = (id, product) => API.delete(`/remove/${id}/${product}` ,)
