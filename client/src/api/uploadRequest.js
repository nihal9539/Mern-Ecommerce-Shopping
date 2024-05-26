import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000/product"})

export const uploadProduct = (formdata) => API.post('/add-product', formdata)
