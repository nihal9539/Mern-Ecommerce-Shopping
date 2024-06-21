const cartReducer = (state = { cartData: [], quantity: 0, loading: false, error: true }, action) => {

    switch (action.type) {
        case "CART_UPLOAD_START":
        case "CART_FETCH_START":
        case "CART_REMOVE_START":
        case "QUANTITY_UPDATE_START":
            return { ...state, loading: true, error: false }
        case "CART_UPLOAD_SUCCESS":
            return { ...state, cartData: [action.data, ...state.cartData], loading: false, error: false }
        case "CART_FETCH_SUCCESS":
            var totalQuantity = 0;
            action.data.map((item) => {
                totalQuantity = totalQuantity + item.quantity;
            });
            return { ...state, cartData: action.data, quantity: totalQuantity, loading: false, error: false }
        case "QUANTITY_UPDATE_SUCCESS":
            return { ...state, quantity: state.quantity + action.data, loading: false, error: false }
        case "CART_REMOVE_SUCCESS":
            return { ...state, quantity: state.quantity - action.data.quantity, cartData: state.cartData.filter(item => item.productId !== action.data.productId || item.size !== action.data.size), loading: false, error: false }
        case "CART_NAVIGATE_FALSE":
            return { ...state, }
        case "CART_UPLOAD_FAIL":
        case "CART_FETCH_FAIL":
        case "CART_REMOVE_FAIL":
            return { ...state, cartData: [],  loading: false, error: true }
        case "QUANTITY_UPDATE_FAIL":
            return { ...state,   loading: false, error: true }
        default:
            return state;
    }
}

export default cartReducer;