import { toast } from "react-toastify"
import *  as UserApi from "../api/UserRequest"
export const updateUserProfile = (userId, data) => async (dispatch) => {
    dispatch({ type: "UPDATE_START" })
    try {
        const updateData = await UserApi.updateUserProfile(userId, data)
        toast.success("Updated Successfully")
        dispatch({ type: "UPDATE_SUCCESS", data: updateData.data })
    } catch (error) {
        toast.error(error.response.data)
        dispatch({ type: "UPDATE_FAIL", data: error.response.data })
    }

}