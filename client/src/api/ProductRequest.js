import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:5000/product" })

export const allProduct = () => API.get('/allProduct')
export const getProductById = (id) => API.get(`/${id}`)
export const deleteProduct = (id) => API.delete(`/delete/${id}`)
export const updateProduct = (id,formData) => API.put(`/update/${id}`,formData)


