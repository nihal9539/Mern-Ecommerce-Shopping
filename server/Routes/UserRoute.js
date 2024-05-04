import express from "express"
import { AllUser } from "../Controller/UserController.js"

const router = express.Router()

router.get('/alluser',AllUser)

export default router


