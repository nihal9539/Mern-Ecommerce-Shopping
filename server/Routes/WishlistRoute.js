import express from "express"
import { createWishlist ,getWishlist} from "../Controller/WishlistCOntroller.js"
const route = express.Router()

route.post('/',createWishlist)
route.get('/find/:id',getWishlist)

export default route;