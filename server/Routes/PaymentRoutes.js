import express from "express"
import {  ordering, verify } from "../Controller/PaymentController.js"
import { verifyToken } from "../middleware/verify.js"

const route = express.Router()

route.post("/order",verifyToken, ordering)
route.post('/verify',verifyToken, verify)

export default route