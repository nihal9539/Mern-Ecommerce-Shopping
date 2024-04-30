import axios from "axios"

const API = axios.create({baseURL:"http://localhost:3000/auth"})

export const login = (formData )=> API.post('/login',formData)
export const signup = (formData )=> API.post('/signup',formData)