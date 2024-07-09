import express from "express"
import { AllUser, MonthlyUserRegistraction, updateUserProfile } from "../Controller/UserController.js"
import { verifyToken } from "../middleware/verify.js"

const router = express.Router()

router.get('/alluser', AllUser)
router.put('/update/:userId',verifyToken ,updateUserProfile)
router.get('/monthly-data', MonthlyUserRegistraction)

export default router


