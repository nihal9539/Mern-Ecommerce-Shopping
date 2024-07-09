import express from "express"
import { order, verify } from "../Controller/PaymentController.js"
import { verifyToken } from "../middleware/verify.js"

const route = express.Router()

route.post("/order",verifyToken, order)
route.post('/verify',verifyToken, verify)

export default route