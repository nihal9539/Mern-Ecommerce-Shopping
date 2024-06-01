import express from "express";
import { addToCart, cartQuantityUpdate, getUserCart, removeFromCart } from "../Controller/CartController.js";

const router = express.Router()

router.post('/add/:userId',addToCart)
router.delete('/remove/:userId/:productId/:size',removeFromCart)
router.get('/get/:userId',getUserCart)
router.put('/change-product-quantity/:userId/:productId/:size/:quantity',cartQuantityUpdate)
export default router