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
import PaymentRoutes from "./Routes/PaymentRoutes.js"
import AddressRoute from "./Routes/AddressRoute.js"
import OrderRoute from "./Routes/OrderRoute.js"
import AdminRoute from "./Routes/AdminRoute.js"
import DashboardRoute from "./Routes/DashboardRoute.js"

const app = express()


// Middleware
app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


dotenv.config()
mongoose.connect(process.env.MONGO_DB).then(()=>{
    app.listen(process.env.PORT || 7000,(req,res)=>{
    })
}).catch((err)=>{
    console.log(err.message);
})

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Routes
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)
app.use('/cart',CartRoute)
app.use('/product',ProductRoute)
app.use('/wishlist',WishlistRoute)
app.use('/payment',PaymentRoutes)
app.use('/address',AddressRoute)
app.use('/order',OrderRoute)
app.use('/admin',AdminRoute)
app.use('/dashboard',DashboardRoute)
