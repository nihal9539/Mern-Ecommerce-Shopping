import { getOrders } from "../api/OrderRequest"

export const getOrder = (userId) => async (dispatch) => {
    dispatch({ type: "ORDER_FETCHING_START" })
    try {
        const orders = await getOrders(userId)
        dispatch({ type: "ORDER_FETCHING_SUCCESS", data: orders.data })
    } catch (error) {
        dispatch({ type: "ORDER_FETCHING_FAIL" })
    }
}