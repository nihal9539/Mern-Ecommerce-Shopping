import express from "express"
import { addNewAddress } from "../Controller/AddressController.js"


const router = express.Router()


router.post('/add/:userId',addNewAddress)
router.get('/get/:userId')
router.post('/remove/:userId')


export default router;