import { AddressModel } from "../model/AddressModel.js";
export const addNewAddress =async(req,res)=>{
    const {userId} = req.params;
    const {firstName,lastName,address,city,phone,pincode,state} = req.body;

    try {
        
            const contryCode = "+91"
              
            const newAddress = new AddressModel({
                userId:userId,
                name:firstName + lastName,
                phone:contryCode +phone,
                state,
                city:city,
                pinCode:pincode,
                address,


            })
            await newAddress.save()
            res.status(200).json(newAddress)
        

        
    } catch (error) {
        res.status(500).json(error.message)
    }
}