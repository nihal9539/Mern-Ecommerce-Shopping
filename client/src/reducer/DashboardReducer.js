const DashboardReducer = (state = { error: false, loading: false, totalProductCount: [], monthlyUserData: [], orderByMonthData: [], topSellingProducts: [], revenueByMonthData: [] }, action) => {
    switch (action.type) {
        case "MONTHLY_ORDER_DATA_START":
        case "TOP_SELLING_PRODUCT_START":
        case "MONTHLY_REVENUE_DATA_START":
        case "MONTHLY_USER_DATA_START":
        case "TOTAL_PRODUCT_COUNT_START":
            return { ...state, loading: true, error: false }
        case "MONTHLY_ORDER_DATA_SUCCESS":
            return { ...state, loading: true, error: false, orderByMonthData: action.data }
        case "MONTHLY_REVENUE_DATA_SUCCESS":
            return { ...state, loading: true, error: false, revenueByMonthData: action.data }
        case "TOP_SELLING_PRODUCT_SUCCESS":
            return { ...state, loading: true, error: false, topSellingProducts: action.data }
        case "MONTHLY_USER_DATA_SUCCESS":
            return { ...state, loading: true, error: false, monthlyUserData: action.data }
        case "TOTAL_PRODUCT_COUNT_SUCCESS":
            return { ...state, loading: true, error: false, totalProductCount: action.data }
        case "MONTHLY_ORDER_DATA_FAIL":
        case "MONTHLY_REVENUE_DATA_FAIL":
        case "TOP_SELLING_PRODUCT_FAIL":
        case "MONTHLY_USER_DATA_FAIL":
        case "TOTAL_PRODUCT_COUNT_FAIL":
            return { ...state, loading: false, error: true, }

        default:
            return state;
    }
}

export default DashboardReducer;