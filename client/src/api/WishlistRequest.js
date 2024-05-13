import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:3000/wishlist" })

export const createWishlist = (id, data) => API.post(`/${id}`, {product:data})
export const getWishlist = (id) => API.get(`/find/${id}`)
export const removeFromWishlist = (id, product) => API.delete(`/remove/${id}/${product}` )
