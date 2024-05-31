import mongoose from "mongoose";

const productScehema = new mongoose.Schema({
    productname: {
        type: String,
        require: true
    },
    subTitle: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
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
        require: true

    },
    discount: {
        type: Number
    }

})

const ProductModel = mongoose.model('product', productScehema)
export default ProductModel