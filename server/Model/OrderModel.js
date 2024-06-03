import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    orderItems: [{
        product: {
            type: String,
            ref: 'Product',
            required: true
        },
        size: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
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
    totalPrice: { type: Number, required: true },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date }
}, { timestamps: true });



const orderModel = mongoose.model('Order', orderSchema)