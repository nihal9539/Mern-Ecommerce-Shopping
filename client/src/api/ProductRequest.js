import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:3000/product" })

export const allProduct = () => API.get('/allProduct')


