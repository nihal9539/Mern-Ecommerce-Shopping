import express from "express"
import { changingOrderStatus, orderByMonth, deleteOrder, getAllOrder, getOderById, getUserOrder, revenueByMonth, getTopSellingProducts, getLastSevenDayOrder } from "../Controller/OrderController.js";

const route = express.Router()


route.get('/:userId',getUserOrder)
route.get('/order-details/:id',getOderById)
route.get('/',getAllOrder)
route.delete('/delete/:id',deleteOrder)
route.put('/status-change/:id',changingOrderStatus)
route.get('/monthly/revenue',revenueByMonth)
route.get('/monthly/orders',orderByMonth)
route.get('/top-selling/item',getTopSellingProducts)
route.get('/seven-day/order',getLastSevenDayOrder)

export default route;