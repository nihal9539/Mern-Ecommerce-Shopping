import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
      type: String,
      ref: 'User',
      required: true
    },
    name:{type: String, required: true },
    phone: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pinCode: { type: String, required: true },
    address: { type: String, required: true }
  }, { timestamps: true });


  export const AddressModel = mongoose.model('Address',addressSchema)