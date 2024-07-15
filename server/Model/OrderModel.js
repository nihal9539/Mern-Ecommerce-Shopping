import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'users',
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
    
    orderStatus: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered','Cancelled'],
        default: 'Pending'
    },
    isDelivered: { type: Boolean, default: false },
}, { timestamps: true });



const orderModel = mongoose.model('Order', orderSchema)

export default orderModel;