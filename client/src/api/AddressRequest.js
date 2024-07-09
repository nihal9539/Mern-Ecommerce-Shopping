import axios from "axios"
import useToken from "../hooks/useToken";

const API = axios.create({baseURL:"http://localhost:5000/address"})
const {headers} = useToken()
API.interceptors.request.use(
  config => {
    const { headers } = useToken();
    config.headers = { ...config.headers, ...headers };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const addNewAddress = (userId ,formData)=> API.post(`/add/${userId}`,formData)
