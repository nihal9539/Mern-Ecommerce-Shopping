import express from "express";
import { addToCart, getUserCart, removeFromCart } from "../Controller/CartController.js";

const router = express.Router()

router.post('/add/:userId',addToCart)
router.delete('/remove/:userId/:productId/:size',removeFromCart)
router.get('/get/:userId',getUserCart)
export default router