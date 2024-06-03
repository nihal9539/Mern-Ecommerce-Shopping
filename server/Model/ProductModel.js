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
    image: {
        type: String,
        required: true
    },
    images:{
        type:Object
    },
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
    }

})

const ProductModel = mongoose.model('product', productScehema)
export default ProductModel