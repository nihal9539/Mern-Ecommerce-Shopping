import express from "express"
import { changingOrderStatus, deleteOrder, getAllOrder, getOderById, getUserOrder } from "../Controller/OrderController.js";

const route = express.Router()


route.get('/:userId',getUserOrder)
route.get('/order-details/:id',getOderById)
route.get('/',getAllOrder)
route.delete('/delete/:id',deleteOrder)
route.put('/status-change/:id',changingOrderStatus)

export default route;