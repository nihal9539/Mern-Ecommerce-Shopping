const cartReducer = (state = { cartData: [], loading: false, error: true }, action) => {

    switch (action.type) {
        case "CART_UPLOAD_START":
        case "CART_FETCH_START":
        case "CART_REMOVE_START":
            return { ...state, loading: true, error: false }
        case "CART_UPLOAD_SUCCESS":
            return { ...state, cartData:[ action.data,...state.cartData], loading: false, error: false }
        case "CART_FETCH_SUCCESS":
            return { ...state, cartData: action.data, loading: false, error: false }
        case "CART_REMOVE_SUCCESS":
            return { ...state, cartData: state.cartData.filter(item => item.productId !== action.data.productId && item.size !== action.data.size), loading: false, error: false }
        case "CART_UPLOAD_FAIL":
        case "CART_FETCH_FAIL":
        case "CART_REMOVE_FAIL":
            return { ...state, cartData: [], loading: false, error: true }
        default:
            return state;
    }
}

export default cartReducer;