import express from "express"
import { getOrder } from "../Controller/OrderController.js";

const route = express.Router()


route.get('/:userId',getOrder)

export default route;