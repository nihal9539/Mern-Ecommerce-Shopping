import { toast } from "react-toastify"
import *  as UploadApi from "../api/uploadRequest.js"

export const uploadProduct = (data) => async (dispatch) => {
    dispatch({ type: "UPLOAD_START" })
    try {
        const newPost = await UploadApi.uploadProduct(data)
        dispatch({ type: "UPLOAD_SUCCESS" ,data:newPost.data})
    } catch (error) {
        dispatch({ type: "UPLOAD_FAIL" })
        toast.error(error)
    }
}