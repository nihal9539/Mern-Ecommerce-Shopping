import express from "express"
import { lastTwentyDaysOrder, revenueDistribution } from "../Controller/DashboardCOntroller.js";
const route = express.Router()

// admin
route.get('/revenue-category', revenueDistribution)
route.get('/lastTwentyDaysOrder', lastTwentyDaysOrder)


export default route;