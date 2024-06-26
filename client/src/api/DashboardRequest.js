import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/",
})
export const orderByMonth = () => API.get('order/monthly/orders')
export const revenueByMonth = () => API.get('order/monthly/revenue')
export const monthlyUser = ()=> API.get(`user/monthly-data`)
export const getTopSellingProducts = ()=> API.get(`order/top-selling/item`)
export const getTotalProduct = ()=> API.get(`product//total/count`)
