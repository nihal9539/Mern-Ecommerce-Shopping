import express from "express"
import { createWishlist ,getWishlist, removeFromWishlist} from "../Controller/WishlistController.js"
import { verifyToken } from "../middleware/verify.js"
const route = express.Router()

route.post('/:id', verifyToken,createWishlist)
route.get('/find/:id',getWishlist)
route.delete('/remove/:userId/:product',verifyToken,removeFromWishlist)

export default route;