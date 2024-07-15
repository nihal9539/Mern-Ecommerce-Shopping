import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000/admin"})

export const AdminLogin = (formData )=> API.post('/login',formData)
