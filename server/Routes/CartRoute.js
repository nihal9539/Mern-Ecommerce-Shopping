import express from "express";
import { AddToCart } from "../Controller/CartController.js";

const router = express.Router()

router.post('/add',AddToCart)
export default router