import mongoose from "mongoose";
import ProductModel from "../model/ProductModel.js"
import cloudinary from "../utilities/cloudinary.js"
import CartModel from "../model/CartModel.js";

export const createProduct = async (req, res) => {

    const { productname, subTitle, description,category, discount, images, sizes, gender, price } = req.body;

    console.log(typeof discount);

    const uploadedImages = await Promise.all(
        images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image, {
                folder: "products",
            });
            return {
                public_id: result.public_id,
                url: result.secure_url,
            };
        })
    );
    console.log(uploadedImages);
    const newProduct = await new ProductModel({
        productname,
        subTitle,
        discount,
        description,
        sizes,
        gender,
        price,
        image: uploadedImages,
        category
    })
    try {


        await newProduct.save()
        res.status(200).json(newProduct)
    } catch (error) {

        res.status(500).json(error.message)

    }
}
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productname, subTitle, description, image, sizes, gender, price } = req.body;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }
        const existingProduct = await ProductModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        if (image && image !== "") {
            const result = await cloudinary.uploader.upload(image, {
                folder: 'products',
            })

            const updatedProduct = await ProductModel.findByIdAndUpdate(id, {
                productname, subTitle, description, sizes, image: {
                    public_id: result.public_id,
                    url: result.secure_url,

                }, gender, price
            }, { new: true })
            return res.status(200).json(updatedProduct)
        }
        const updateData = { productname, subTitle, description, gender, price, sizes };
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true })
        return res.status(200).json(updatedProduct)


    } catch (error) {
        res.status(500).json(error.message)

    }

}

export const getProductById = async (req, res) => {

    const { id } = req.params
    try {

        const product = await ProductModel.findById(id)
        if (!product) {

            res.status(400).json("Product not found")
        } else {

            res.status(200).json(product)
        }

    } catch (error) {

        res.status(500).json(error.message)

    }
}
export const getAllProduct = async (req, res) => {


    try {

        const allProduct = await ProductModel.find()
        res.status(200).json(allProduct)
    } catch (error) {

        res.status(500).json(error.message)

    }
}

export const deleteProduct = async (req, res) => {
    const { productId } = req.params
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json("Id is not valid");
    }
    try {
        const product = await ProductModel.findByIdAndDelete(productId)
        if (!product) {
            res.status(400).json("Product Not found")
            console.log("not");
        } else {

            await CartModel.updateMany({}, { $pull: { items: { product: productId } } });
            res.status(200).json("Product deleted successfully")
        }

    } catch (error) {
        res.status(500).json(error.messsage)

    }


}
export const totalProductCount = async (req, res) => {
    try {
        const productCount = await ProductModel.countDocuments()
        return res.status(200).json(productCount)
    } catch (error) {
        res.status(500).json(error.messsage)
    }
};