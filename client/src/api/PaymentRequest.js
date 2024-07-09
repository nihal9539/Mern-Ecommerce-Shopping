import axios from "axios";
import useToken from "../hooks/useToken";

const API = axios.create({
    baseURL:"http://localhost:5000/payment"
})
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

export const orderRequest =(amount)=> API.post('/order',{amount})
export const verifyRequest =(data)=> API.post('/verify',{data})
