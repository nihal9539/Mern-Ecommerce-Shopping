import express from "express"
import { AllUser, updateUserProfile } from "../Controller/UserController.js"

const router = express.Router()

router.get('/alluser', AllUser)
router.put('/update/:userId', updateUserProfile)

export default router


