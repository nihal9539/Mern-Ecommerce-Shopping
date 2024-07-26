import express from "express"
import { activeStatusChange, createProduct, deleteProduct, getAllProduct, getProductById, totalProductCount, updateProduct } from "../Controller/ProductController.js"

const route = express.Router()

route.post("/add-product",createProduct)
route.get("/allProduct",getAllProduct)
route.get("/:id",getProductById)
route.put("/update/:id",updateProduct)
route.delete("/delete/:productId",deleteProduct)
route.get("/total/count",totalProductCount)


route.put("/:productId/active-status",activeStatusChange)


export default route