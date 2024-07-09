import ProductModel from "../model/ProductModel.js";
import WishlistModel from "../model/WishlistModel.js"


export const createWishlist = async (req, res) => {
    try {
        const userId = req.params.id
        const { product } = req.body;

        // Check if a wishlist exists for the given userId
        const wishlist = await WishlistModel.findOne({ userId: userId });

        if (wishlist == null) {
            // If no wishlist exists, create a new one
            const wishlists = new WishlistModel({
                userId: userId,
                productIds: product
            });
            await wishlists.save();
            return res.status(200).json(wishlists);
        } else {
            // If wishlist exists, update it by pushing the new product


            wishlist.productIds.push(product);
            await wishlist.save();
            return res.status(200).json(wishlist);

        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const removeFromWishlist = async (req, res) => {
    const { userId, product } = req.params;
    try {
        const wishlist = await WishlistModel.findOne({ userId: userId });
        if (!wishlist) {
            return res.status(404).json("Wishlist not found");
        }

        if (!wishlist.productIds.includes(product)) {
            return res.status(400).json("Item not found in wishlist");
        }

        await WishlistModel.updateOne({ userId: userId }, { $pull: { productIds: product } });
        return res.status(200).json("Removed from wishlist");
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
export const getWishlist = async (req, res) => {

  
    try {
        const id = req.params.id;

        // Find the wishlist for the user
        const wishlist = await WishlistModel.findOne({ userId: id });

        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found' });
        }

        // Fetch products based on product IDs in the wishlist
        const products = await ProductModel.find({ _id: { $in: wishlist.productIds } });

        res.json({ wishlist, products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}