import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/order"
})

export const getUserOrder = (userId) => API.get(`/${userId}`)
export const getAllOrder = () => API.get(`/`)
export const getOderById = (id) => API.get(`/order-details/${id}`)
export const deleteOrder = (id) => API.delete(`/delete/${id}`)
export const changingOrderStatus = (id,data) => API.put(`/status-change/${id}`,data)