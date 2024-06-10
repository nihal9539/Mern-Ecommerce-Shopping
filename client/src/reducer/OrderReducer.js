
const OrderReducer = (state = { loading: false, orders: [], error: false }, action) => {
    switch (action.type) {
        case "ORDER_FETCHING_START":
            return { ...state, orders: [], loading: true, error: false }
        case "ORDER_FETCHING_SUCCESS":
            return { ...state, orders: action.data, loading: false, error: false }
        case "ORDER_FETCHING_FAIL":
            return { ...state, orders: [], loading: false, error: true }
        default:
            return state;
    }
}

export default OrderReducer;