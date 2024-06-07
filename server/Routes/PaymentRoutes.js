import express from "express"
import { order, verify } from "../Controller/PaymentController.js"

const route = express.Router()

route.post("/order",order)
route.post('/verify', verify)

export default route