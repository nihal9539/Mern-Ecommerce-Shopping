import WishlistModel from "../model/WishlistModel.js"


export const createWishlist = async (req, res) => {
    try {
        const { product, userId } = req.body;
        console.log(req.body);

        // Check if a wishlist exists for the given userId
        const wishlist = await WishlistModel.findOne({ userId: userId });
        console.log(wishlist);

        if (wishlist == null) {
            console.log("hii");
            // If no wishlist exists, create a new one
            const wishlists = new WishlistModel({
                userId: userId,
                productIds: product
            });
            await wishlists.save();
            return res.status(200).json(wishlists);
        } else {
            // If wishlist exists, update it by pushing the new product
            if (wishlist.productIds.includes(product)) {
                console.log("hii");
                const newWishlist = await wishlist.updateOne({ $pull: { productIds: product } })
                return res.status(200).json('delete from wishlist');
            }
            else {
                console.log("hi2");
                wishlist.productIds.push(product);
                await wishlist.save();
                return res.status(200).json(wishlist);
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
// export const createWishlist = async (req, res) => {
//     try {
//         const { product, userId } = req.body;

//         // Check if a wishlist exists for the given userId
//         let wishlist = await WishlistModel.findOne({ userId: userId });

//         if (!wishlist) {
//             // If no wishlist exists, create a new one with the provided userId and the product as the first item in the items array
//             wishlist = new WishlistModel({
//                 userId: userId,
//                 items: [{ productId: product }]
//             });
//             await wishlist.save();
//             return res.status(200).json(wishlist);
//         } else {
//             // If wishlist exists, check if the product is already in the wishlist items
//             const existingItem = wishlist.items.find(item => item.productId === product);
//             if (existingItem) {
//                 // If product already exists, you may want to update its quantity or handle it differently
//                 // For simplicity, let's assume we're ignoring duplicate products
//                 return res.status(200).json(wishlist); 
//             } else {
//                 // If product does not exist, push it to the items array
//                 wishlist.items.push({ productId: product });
//                 await wishlist.save();
//                 return res.status(200).json(wishlist);
//             }
//         }
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
export const getWishlist = async (req, res) => {

    const userId = req.params.id;
    const wishlistItems = await WishlistModel.find({ userId: userId });
    try {
        console.log(wishlistItems);
        if (wishlistItems.length == 0 ) {
            
            res.status(400).json("Wishlist item not found");
        }else{
            res.status(200).json(wishlistItems);
        }
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}