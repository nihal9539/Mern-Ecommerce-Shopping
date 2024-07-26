const DashboardReducer = (state = { error: false,revenueCategory:[],lastOrder:[], loading: false, totalProductCount: [], monthlyUserData: [], orderByMonthData: [], topSellingProducts: [], revenueByMonthData: [] }, action) => {
    switch (action.type) {
        case "MONTHLY_ORDER_DATA_START":
        case "TOP_SELLING_PRODUCT_START":
        case "MONTHLY_REVENUE_DATA_START":
        case "MONTHLY_USER_DATA_START":
        case "TOTAL_PRODUCT_COUNT_START":
        case "REVENUE_CATEGORY_START":
        case "TWENTY_DAY_ORDER_FETCH_START":
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
        case "REVENUE_CATEGORY_SUCCESS":
            return { ...state, loading: true, error: false, revenueCategory: action.data }
        case "TWENTY_DAY_ORDER_FETCH_SUCCESS":
            return { ...state, loading: true, error: false, lastOrder: action.data }
        case "MONTHLY_ORDER_DATA_FAIL":
        case "MONTHLY_REVENUE_DATA_FAIL":
        case "TOP_SELLING_PRODUCT_FAIL":
        case "MONTHLY_USER_DATA_FAIL":
        case "TOTAL_PRODUCT_COUNT_FAIL":
        case "TWENTY_DAY_ORDER_FETCH_FAIL":
            return { ...state, loading: false, error: true, }

        default:
            return state;
    }
}

export default DashboardReducer;