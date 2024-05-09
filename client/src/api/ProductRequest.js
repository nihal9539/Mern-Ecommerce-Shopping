import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:3000/product" })

export const allUser = (formdata) => API.post('/add-product', formdata)


