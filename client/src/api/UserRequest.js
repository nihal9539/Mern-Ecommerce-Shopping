import axios from "axios"
import useToken from "../hooks/useToken";

const API = axios.create({baseURL:"http://localhost:5000/user"})
const {headers} = useToken()
API.interceptors.request.use(
  config => {
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
const token = localStorage.getItem('token')
export const allUser = ( )=> API.post('/alluser')
export const updateUserProfile = (userId,formData)=> API.put(`/update/${userId}`,formData)
