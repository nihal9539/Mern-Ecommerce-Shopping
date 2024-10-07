import mongoose from "mongoose";
import cloudinary from "../utilities/cloudinary.js"
import CartModel from "../model/CartModel.js";
import ProductModel from "../model/ProductModel.js"

// console.log('Current directory:', __dirname);

export const createProduct = async (req, res) => {

    const { productname, subTitle, description, category, images, sizes, gender, price } = req.body;
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
    const newProduct = await new ProductModel({
        productname,
        subTitle,
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
    console.log(image);
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid product ID' });
        }

        const existingProduct = await ProductModel.findById(id);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Determine which images to keep and which to add
        const existingImages = existingProduct.image.map(img => img.public_id);
        let updatedImages = image.filter((img) => existingImages.includes(img.public_id)); // Keep existing images with public_id
        const newImages = image.filter((img) => !img.public_id); // New images to be uploaded

        // Upload new images to Cloudinary
        for (const img of newImages) {
            const result = await cloudinary.uploader.upload(img.base64, { folder: 'products' });
            updatedImages.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        // Delete images from Cloudinary and database if they are not in the request
        const imagesToDelete = existingProduct.image.filter((img) => {
            return !image.some((reqImg) => reqImg.public_id === img.public_id);
        });

        for (const img of imagesToDelete) {
            await cloudinary.uploader.destroy(img.public_id);
        }

        const updateData = {
            productname,
            subTitle,
            description,
            sizes,
            image: updatedImages,
            gender,
            price
        };

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

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


export const activeStatusChange = async (req, res) => {
    const { isActive } = req.body;
    if (typeof isActive !== 'boolean') {
      return res.status(400).send({ error: 'isActive must be a boolean' });
    }
  
    try {
      const product = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        { isActive },
        { new: true }
      );
      if (!product) {
        return res.status(404).send({ error: 'Product not found' });
      }
      res.send(product);
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while updating the product status' });
    }
};
