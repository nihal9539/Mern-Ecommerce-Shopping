import express from "express"
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../Controller/ProductController.js"

const route = express.Router()

route.post("/add-product",createProduct)
route.get("/allProduct",getAllProduct)
route.get("/:id",getProductById)
route.put("/update/:id",updateProduct)
route.delete("/delete/:productId",deleteProduct)

export default route