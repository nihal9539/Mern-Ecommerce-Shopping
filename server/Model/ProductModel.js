import mongoose from "mongoose";

const productScehema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    sizes: [{
        size: String,
        quantity: Number
    }],
    gender: String,
    price: {
        type: Number,
        required: true

    },
    discount: {
        type: Number
    },
    category: [
        {
            type: String,
        }
    ]

})

const ProductModel = mongoose.model('product', productScehema)
export default ProductModel