// actions.js
import { toast } from "react-toastify"
import * as AddressApi from "../api/AddressRequest"




export const addNewAddress = (userId,formData,nextStep) => async (dispatch) => {
  dispatch({ type: "ADDRESS_START" })
  try {
    const data = await AddressApi.addNewAddress(userId,formData)
    dispatch({ type: "ADDRESS_SUCCESS", data: data.data })
    nextStep()
  } catch (error) {
    dispatch({ type: "ADDRESS_FAIL" })
  
    toast.error(error)

  }
}
