import express from "express"
import { payment, verify } from "../Controller/PaymentController.js"

const route = express.Router()

route.post("/:userId",payment)
route.post('/verify', verify)

export default route