const cartReducer = (state = { paymentDetails: null,  loading: false, error: true }, action) => {

    switch (action.type) {
        case "PAYMENT_START":
            return { ...state,  loading: true, error: false }
        case "PAYMENT_SUCCESS":
            return { ...state, paymentDetails: action.data,  loading: false, error: false }
        case "PAYMENT_FAIL":
            return { ...state, paymentDetails: null,  loading: false, error: true }
        default:
            return state;
    }
}

export default cartReducer;