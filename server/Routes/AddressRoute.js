import express from "express"
import { addNewAddress } from "../Controller/AddressController.js"
import {verifyToken} from "../middleware/verify.js"


const router = express.Router()


router.post('/add/:userId',verifyToken,addNewAddress)
router.get('/get/:userId')
router.post('/remove/:userId')


export default router;