import CartModel from "../model/CartModel.js";


export const addToCart = async (req, res) => {
    const { userId } = req.params;
    const { productId,imageUrl, quantity, size, price } = req.body;
    try {
        const cart = await CartModel.findOne({ userId })
        if (!cart) {
            const cart = new CartModel({
                userId: userId,
                products: [
                    {
                        productId,
                        quantity,
                        size,
                        price,
                        imageUrl
                    }
                ]
            })
            await cart.save()
            return res.status(200).json(cart);
        }
        const itemIndex = cart.products.findIndex(item => item.productId === productId && item.size === size);
        console.log(itemIndex);
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
                imageUrl
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
export const getUserCart = async (req, res) => {
    const { userId } = req.params;
    console.log(userId);
    try {
        const cart = await CartModel.findOne({ userId:userId })
        console.log(cart);
        if (cart) {

            res.status(200).json(cart.products)
        } else {
            res.status(400).json("Cart Not Found")

        }

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
