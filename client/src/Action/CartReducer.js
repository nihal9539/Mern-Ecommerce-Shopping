import * as CartApi from "../api/CartRequest"

export const addToCart = (userId, formData) => async (dispatch) => {
    dispatch({ type: "CART_UPLOAD_START" })

    try {
        const cart = await CartApi.addToCart(userId, formData)
        dispatch({ type: "CART_UPLOAD_SUCCESS", data: cart.data.products })

    } catch (error) {
        dispatch({ type: "CART_UPLOAD_FAIL" })
    }

}
export const getUserCart = (userId) => async (dispatch) => {
    dispatch({ type: "CART_FETCH_START" })

    try {
        const cart = await CartApi.getUserCart(userId)
        console.log(cart);
        dispatch({ type: "CART_FETCH_SUCCESS", data: cart.data })

    } catch (error) {
        dispatch({ type: "CART_FETCH_FAIL" })
    }

}
export const removeFromCart = (userId, productId, size) => async (dispatch) => {
    dispatch({ type: "CART_REMOVE_START" })

    try {
        const cart = await CartApi.removeFromCart(userId, productId, size)
        dispatch({ type: "CART_REMOVE_SUCCESS", data: cart.data.products })

    } catch (error) {
        dispatch({ type: "CART_REMOVE_FAIL" })
    }

}
