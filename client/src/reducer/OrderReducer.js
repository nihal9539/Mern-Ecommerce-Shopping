
const OrderReducer = (state = { loading: false, orderById: [], allOrders: [], orders: [], error: false }, action) => {
    switch (action.type) {
        case "ORDER_FETCHING_START":
        case "FETCHING_ALL_ORDER_START":
            return { ...state, orders: [], loading: true, error: false }
        case "ORDER_DELETE_START":
            return { ...state, loading: true, error: false }
        case "ORDER_FETCHING_SUCCESS":
            return { ...state, orders: action.data, loading: false, error: false }
        case "FETCHING_ALL_ORDER_SUCCESS":
            return { ...state, allOrders: action.data, loading: false, error: false }
        case "ORDER_FETCHING_FAIL":
            return { ...state, orders: [], loading: false, error: true }
        case "ORDER_DELETE_SUCCESS":
            return { ...state, loading: false, allOrders: state.allOrders.filter(item => item._id !== action.data), uploading: false, error: false };
        case "FETCHING_ALL_ORDER_FAIL":
            return { ...state, allOrders: [], loading: false, error: true }
        case "ORDER_DELETE_FAIL":
            return { ...state, loading: false, error: true }
        case "FETCHING_ORDER_BY_ID_START":
            return { ...state, loading: false, error: true }
        case "FETCHING_ORDER_BY_ID_SUCCESS":
            return { ...state, orderById: action.data, loading: false, error: true }
        case "FETCHING_ORDER_BY_ID_FAIL":
            return { ...state, loading: false, error: true }

        default:
            return state;
    }
}

export default OrderReducer;