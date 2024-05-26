import express from "express";
import cors from "cors"
import  bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import AuthRoute from "./Routes/AuthRoute.js"
import CartRoute from "./Routes/CartRoute.js"
import UserRoute from "./Routes/UserRoute.js"
import ProductRoute from "./Routes/ProductRoute.js"
import WishlistRoute from "./Routes/WishlistRoute.js"

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


dotenv.config()
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("connect");
    app.listen(process.env.PORT,(req,res)=>{
        console.log("connect to 5000");
    })
}).catch((err)=>{
    console.log(err.message);
})
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/cart',CartRoute)
app.use('/product',ProductRoute)
app.use('/wishlist',WishlistRoute)
