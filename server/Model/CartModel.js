import mongoose from "mongoose"

const CartSchema = mongoose.Schema({
    userId: { type: String, require: true },
    product: [
        {
            productId: Number,
            qunantity: String,
            name: String,
            price: Number
        }
    ]


}, {
    timestamps: true
}
)

const CartModel = mongoose.model('cart', CartSchema)
export default  CartModel;