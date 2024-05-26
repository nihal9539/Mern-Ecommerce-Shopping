import axios from "axios"

const API = axios.create({baseURL:"http://localhost:5000/user"})

export const allUser = ( )=> API.post('/alluser')
