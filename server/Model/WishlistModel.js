import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,

  },
  productIds: [],
}, {
  timestamps: true
});

const WishlistModel = mongoose.model('Wishlist', wishlistSchema);
export default WishlistModel