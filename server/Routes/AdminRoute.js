import express from "express"
import { loginAdmin, registerAdmin } from "../Controller/AdminController.js"

const route = express.Router()

route.post("/login",loginAdmin)
route.post("/signup",registerAdmin)

export default route;