import ProductModel from "../model/ProductModel.js"
import clodunary from "../utilities/cloudinary.js"

export const createProduct = async (req, res) => {
    // console.log(req.body);

    const { productname, subTitle, description, image, sizes, gender, price } = req.body;

    const result = await clodunary.uploader.upload(image, {
        folder: 'products',

    })

    // const newProduct = new ProductModel(req.body)
    const newProduct = new ProductModel({
        productname,
        subTitle,
        description,
        sizes,
        gender,
        price,
        images:{
            public_id:result.public_id,
            url:result.secure_url,

        }
    })
    try {


        await newProduct.save()
        res.status(200).json(newProduct)
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