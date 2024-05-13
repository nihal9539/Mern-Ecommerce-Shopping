import express from "express"
import { createWishlist ,getWishlist, removeFromWishlist} from "../Controller/WishlistCOntroller.js"
const route = express.Router()

route.post('/:id',createWishlist)
route.get('/find/:id',getWishlist)
route.delete('/remove/:userId/:product',removeFromWishlist)

export default route;