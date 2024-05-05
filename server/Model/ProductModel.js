import mongoose from "mongoose";

const productScehema = new mongoose.Schema({
    productname: {
        type: String,
        require: true
    },
    subtitle: {
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
    sizes: [{
        size: String,
        quantity: Number
    }],
    gender: String,
    price: {
        type: Number
    },
    discount: {
        type: Number
    }

})

const ProductModel = mongoose.model('product', productScehema)
export default ProductModel