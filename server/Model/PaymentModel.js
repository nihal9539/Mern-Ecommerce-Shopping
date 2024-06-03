import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
   
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  paymentSignature: { type: String, required: true },
//   paymentDate: { type: Date, required: true }
}, { timestamps: true });

const paymentModel = mongoose.model('Payment',paymentSchema)