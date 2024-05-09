import ProductModel from "../model/ProductModel.js"

export const createProduct = async (req, res) => {
    // console.log(req.body);

    const newProduct = new ProductModel(req.body)
    try {

        console.log(newProduct);
        await newProduct.save()
        res.status(200).json(newProduct)
    } catch (error) {

        res.status(500).json(error.message)

    }
}
export const getAllProduct = async (req, res) => {

    
    try {

      const allProduct = await ProductModel.find()
      console.log(allProduct);
        res.status(200).json(allProduct)
    } catch (error) {

        res.status(500).json(error.message)

    }
}