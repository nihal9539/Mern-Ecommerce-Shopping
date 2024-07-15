import mongoose from "mongoose"

const CartSchema = mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, ref: 'product', required: true },
            quantity: { type: Number, required: true },
            size: { type: String, required: true },
            price: { type: Number, required: true },
            image: { type: String, required: true },
            productname: { type: String, required: true },
        },
    ]

}, {
    timestamps: true
}
)

const CartModel = mongoose.model('cart', CartSchema)
export default CartModel;