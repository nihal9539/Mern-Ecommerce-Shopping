const cartReducer = (state = { paymentDetails: null,orderDetails:null, paymentOrderSuccess:false,  loading: false, error: true }, action) => {

    switch (action.type) {
        case "PAYMENT_ORDER_START":
            return { ...state,orderDetails:null,  loading: true, paymentOrderSuccess:false, error: false }
        case "PAYMENT_ORDER_SUCCESS":
            return { ...state, orderDetails: action.data,  loading: false, paymentOrderSuccess:false, error: false }
        case "PAYMENT_ORDER_FAIL":
            return { ...state, orderDetails: null,  loading: false, paymentOrderSuccess:true, error: true }
        case "PAYMENT_VERIFICATION_START":
            return { ...state,  loading: true, paymentOrderSuccess:false, error: false }
        case "PAYMENT_VERIFICATION_SUCCESS":
            return { ...state, orderDetails: action.data,  loading: false, paymentOrderSuccess:false, error: false }
        case "PAYMENT_VERIFICATION_FAIL":
            return { ...state, orderDetails: null,  loading: false, paymentOrderSuccess:false, error: true }
        default:
            return state;
    }
}

export default cartReducer;