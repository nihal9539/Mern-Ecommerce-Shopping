import express from "express";
import { addToCart, cartQuantityUpdate, getUserCart, removeFromCart } from "../Controller/CartController.js";
import { verifyToken } from "../middleware/verify.js";

const router = express.Router()

router.post('/add/:userId', verifyToken, addToCart)
router.delete('/remove/:userId/:productId/:size',verifyToken,removeFromCart)
router.get('/get/:userId', getUserCart)
router.put('/change-product-quantity/:userId/:productId/:size/:quantity',verifyToken,cartQuantityUpdate)
export default router