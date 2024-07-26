import mongoose from "mongoose";
import CartModel from "../model/CartModel.js";
import { ObjectId } from "mongodb"


export const addToCart = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity,image,productname, size, price } = req.body;
    const product = new ObjectId(productId)
    try {
        const cart = await CartModel.findOne({ userId })
        if (!cart) {
            const cart = new CartModel({
                userId: userId,
                products: [
                    {
                        productId: product,
                        quantity,
                        size,
                        price,
                        image,
                        productname
                    }
                ]
            })
            await cart.save()
            return res.status(200).json(cart);
        }
        const itemIndex = cart.products.findIndex(item => item.productId.toString() === productId && item.size === size);
        if (itemIndex > -1) {
            cart.products[itemIndex].quantity += quantity;
            await cart.save();
            return res.status(200).json(cart);
        } else {

            const cartitem = {
                productId,
                quantity,
                size,
                price,
                image,
                productname
            }
            const cart = await CartModel.findOneAndUpdate(
                { userId: userId },
                { $push: { products: cartitem } },
                { new: true, upsert: true }
            )
            return res.status(200).json(cart);
        }

    } catch (error) {
        res.status(500).json(error.message)

    }
}

export const cartQuantityUpdate = async (req, res) => {
    const { userId, quantity, productId, size } = req.params;
    const count = parseInt(quantity)

    try {

        const cart = await CartModel.findOneAndUpdate(
            {
                userId: userId,
                "products.productId": productId,
                "products.size": size,
            },
            { $inc: { "products.$.quantity": count } }
        )

        if (!cart) {
            return res.status(400).json({ message: 'Product not found in cart or quantity is already at minimum' });
        }
        return res.status(200).json(cart);



    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getUserCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cartDetails = await CartModel.findOne({userId})
        console.log(cartDetails);
        return res.status(200).json(cartDetails);
    } catch (error) {
        res.status(500).json(error.message)
    }

}
export const removeFromCart = async (req, res) => {
    try {
        const { userId, productId, size } = req.params;

        let cart = await CartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== productId || item.size !== size);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
