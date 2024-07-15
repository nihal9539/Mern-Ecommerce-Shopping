import * as CartApi from "../api/CartRequest"
import { toast } from "react-toastify"

export const addToCart = (userId, formData, navigate) => async (dispatch) => {
    dispatch({ type: "CART_UPLOAD_START" })
    try {
        const cart = await CartApi.addToCart(userId, formData,)

        dispatch({ type: "CART_UPLOAD_SUCCESS", data: cart.data.products })
        navigate('/cart');
        toast.success('Item added to cart successfully');

    } catch (error) {
        dispatch({ type: "CART_UPLOAD_FAIL" })
        toast.error('Error adding item to cart');
    }

}
export const getUserCart = (userId) => async (dispatch) => {
    dispatch({ type: "CART_FETCH_START" })

    try {
        const cart = await CartApi.getUserCart(userId)
        dispatch({ type: "CART_FETCH_SUCCESS", data: cart.data.products })

    } catch (error) {
        dispatch({ type: "CART_FETCH_FAIL" })
    }

}
export const removeFromCart = (userId, productId, size, quantity) => async (dispatch) => {
    dispatch({ type: "CART_REMOVE_START" })

    try {
        await CartApi.removeFromCart(userId, productId, size, quantity,)
        dispatch({ type: "CART_REMOVE_SUCCESS", data: { userId, productId, size, quantity } })
        toast.success('Item removed from cart successfully',{position:"bottom-left"});

    } catch (error) {
        dispatch({ type: "CART_REMOVE_FAIL" })
        toast.error('Error removing item from cart');
    }

}

export const cartQuantityUpdate = (userId, productId, size, quantity) => async (dispatch) => {

    dispatch({ type: "QUANTITY_UPDATE_START" })
    try {
        await CartApi.cartQuantityUpdate(userId, productId, size, quantity,);
        dispatch({ type: "QUANTITY_UPDATE_SUCCESS", data: quantity })
        toast.success('Quantity Update successfully',{position:"bottom-left"});


    } catch (error) {
        dispatch({ type: "QUANTITY_UPDATE_FAIL" })
        toast.error('Quantity Update fail');

    }

}