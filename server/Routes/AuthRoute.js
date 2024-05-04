import express from "express";
import { loginUser, registerUser } from "../Controller/UserController.js";
// import { loginUser, registerUser } from "../Controller/AuthController.js";

const router = express.Router()

router.post('/signup',registerUser)
router.post('/login',loginUser)




export default router