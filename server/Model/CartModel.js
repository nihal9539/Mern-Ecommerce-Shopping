import mongoose from "mongoose"

const CartSchema = mongoose.Schema({
    userId: { type: String, require: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', require: true },
            quantity: { type: Number, require: true },
            size: { type: String, require: true },
            price: { type: Number, require: true },
            imageUrl: { type: String, require: true }
        },
    ]


}, {
    timestamps: true
}
)

const CartModel = mongoose.model('cart', CartSchema)
export default CartModel;