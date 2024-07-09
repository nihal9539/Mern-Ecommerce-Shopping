import { orderRequest, verifyRequest } from "../api/PaymentRequest"

export const paymentOrder = (totalAmount) => async (dispatch) => {

    dispatch({ type: "PAYMENT_ORDER_START" })

    try {

        const data = await orderRequest(totalAmount)
        dispatch({ type: "PAYMENT_ORDER_SUCCESS" ,data:data.data})
    } catch (error) {
        dispatch({ type: "PAYMENT_ORDER_FAIL" })
    }
}

export const paymentVerify = (formData) => async (dispatch) => {
    dispatch({ type: "PAYMENT_VERIFICATION_START" })
    try {
       await verifyRequest(formData)
        dispatch({ type: "PAYMENT_VERIFICATION_SUCCESS" })
    } catch (error) {
        dispatch({ type: "PAYMENT_VERIFICATION_FAIL" })
    }
}