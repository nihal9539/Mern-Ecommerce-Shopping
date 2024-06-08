import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000/payment"
})

export const orderRequest =(amount)=> API.post('/order',{amount})
export const verifyRequest =(data)=> API.post('/verify',{data})