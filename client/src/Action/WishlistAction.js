import { toast } from "react-toastify"
import * as WishlistApi from "../api/WishlistRequest"


export const createWishlist = (id, data) => async (dispatch) => {
    dispatch({ type: "WISHLIST_UPLOAD_START" })
    try {
        const wishlist = await WishlistApi.createWishlist(id, data)
        dispatch({ type: "WISHLIST_UPLOAD_SUCCESS", data: wishlist.data.productIds })

        toast.success(
            "Product added to wishlist successfully",
        )
    } catch (error) {
        toast.error(error.response.data);
        dispatch({ type: "WISHLIST_UPLOAD_FAIL" })
    }
}
export const fetchWishlist = (id) => async (dispatch) => {
    dispatch({ type: "WISHLIST_FETCH_START" });
    try {
        const wishlist = await WishlistApi.getWishlist(id);
        dispatch({ type: "WISHLIST_FETCH_SUCCESS", data: wishlist?.data?.products });
    } catch (error) {
        toast.error(error.response.data);
        dispatch({ type: "WISHLIST_FETCH_FAIL" });
    }
};
export const removeFromWishlist = (id, data) => async (dispatch) => {
    dispatch({ type: "WISHLIST_REMOVE_START" })
    try {
        await WishlistApi.removeFromWishlist(id, data)
        dispatch({ type: "WISHLIST_REMOVE_SUCCESS", data: data })
        toast.success(
            "Product removed from wishlist successfully"
        )
    } catch (error) {
        console.log(error);
        toast.error(error.response.data);
        dispatch({ type: "WISHLIST_REMOVE_FAIL" })
    }

}

export const resetWishlist = () => (dispatch)=>{
    
        dispatch({
            type: "WISHLIST_RESET",
        });
    
}
