const cartReducer = (state = { cartData: [], loading: false, error: true }, action) => {

    switch (action.type) {
        case "CART_UPLOAD_START":
        case "CART_FETECH_START":
        case "CART_REMOVE_START":
            return { ...state, loading: false, error: false }

        case "CART_UPLOAD_SUCCESS":
            return { ...state, cartData: [...state.cartData,action.data], loading: false, error: false }
        case "CART_FETCH_SUCCESS":
            return { ...state, cartData: action.data, loading: false, error: false }
        case "CART_UPLOAD_FAIL":
        case "CART_FETECH_FAIL":
        case "CART_REMOVE_FAIL":
            return { ...state, cartData: action.data, loading: false, error: false }
        default:
            return state;
    }
}

export default cartReducer;