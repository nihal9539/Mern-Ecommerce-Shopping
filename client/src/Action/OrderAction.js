import { toast } from "react-toastify"
import *  as OrderApi from "../api/OrderRequest.js"


export const getOrder = (userId) => async (dispatch) => {
    dispatch({ type: "ORDER_FETCHING_START" })
    try {
        const orders = await OrderApi.getUserOrder(userId)
        dispatch({ type: "ORDER_FETCHING_SUCCESS", data: orders.data })
    } catch (error) {
        dispatch({ type: "ORDER_FETCHING_FAIL" })
    }
}
export const getAllOrder = () => async (dispatch) => {
    dispatch({ type: "FETCHING_ALL_ORDER_START" })
    try {
        const allOrders = await OrderApi.getAllOrder()
        dispatch({ type: "FETCHING_ALL_ORDER_SUCCESS", data: allOrders.data })
    } catch (error) {
        dispatch({ type: "FETCHING_ALL_ORDER_FAIL" })
    }
}
export const getOderById = (id) => async (dispatch) => {
    dispatch({ type: "FETCHING_ORDER_BY_ID_START" })
    try {
        const order = await OrderApi.getOderById(id)
        dispatch({ type: "FETCHING_ORDER_BY_ID_SUCCESS", data: order.data })
    } catch (error) {
        dispatch({ type: "FETCHING_ORDER_BY_ID_FAIL" })
    }
}
export const deleteOrder = (id) => async (dispatch) => {
    dispatch({ type: "ORDER_DELETE_START" })
    try {
        await OrderApi.deleteOrder(id)
        dispatch({ type: "ORDER_DELETE_SUCCESS", data: id })
        toast.error("Order delete Successfully")

    } catch (error) {
        toast.error(error?.response?.data)
        dispatch({ type: "ORDER_DELETE_FAIL" })
    }
}
export const changingOrderStatus = (id, status) => async (dispatch) => {
    dispatch({ type: "ORDER_STATUS_CHANGE_START" })
    try {
        await OrderApi.changingOrderStatus(id, status)
        dispatch({ type: "ORDER_STATUS_CHANGE_SUCCESS", })
        toast.success("Order Status Update")
    } catch (error) {
        toast.error(error?.response?.data)
        dispatch({ type: "ORDER_STATUS_CHANGE_FAIL" })
    }
}