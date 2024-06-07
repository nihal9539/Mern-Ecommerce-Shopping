import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

  orderId: { type: String},
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  paymentId: { type: String},
  paymentSignature: { type: String},
  //   paymentDate: { type: Date, required: true }
}, { timestamps: true });

const paymentModel = mongoose.model('Payment', paymentSchema)
export default paymentModel;