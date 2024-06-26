import express from "express"
import { AllUser, MonthlyUserRegistraction, updateUserProfile } from "../Controller/UserController.js"

const router = express.Router()

router.get('/alluser', AllUser)
router.put('/update/:userId', updateUserProfile)
router.get('/monthly-data', MonthlyUserRegistraction)

export default router


