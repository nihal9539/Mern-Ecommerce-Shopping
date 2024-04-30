import express from "express";
import cors from "cors"
import  bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import AuthRoute from "./Routes/AuthRoute.js"

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))


dotenv.config()
mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("connect");
    app.listen(process.env.PORT,(req,res)=>{
        console.log("connect to 3000");
    })
}).catch((err)=>{
    console.log(err.message);
})
app.use('/auth',AuthRoute)
