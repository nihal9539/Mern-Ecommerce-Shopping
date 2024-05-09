import express from "express"
import { createProduct, getAllProduct } from "../Controller/ProductController.js"

const route = express.Router()

route.post("/add-product",createProduct)
route.get("/allProduct",getAllProduct)

export default route