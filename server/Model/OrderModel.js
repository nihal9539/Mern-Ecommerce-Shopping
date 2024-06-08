import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    orderItems: [],
    shippingAddressId: {
        type: String,
        ref: 'Address',
        required: true
    },
    paymentResultId: {
        type: String,
        ref: 'Payment',
        required: true
    },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
}, { timestamps: true });



const orderModel = mongoose.model('Order', orderSchema)

export default orderModel;