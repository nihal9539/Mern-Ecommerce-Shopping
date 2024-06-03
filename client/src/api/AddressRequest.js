import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000/address"})

export const addNewAddress = (userId ,formData)=> API.post(`/add/${userId}`,formData)
