import *  as UploadApi from "../api/uploadRequest.js"

export const uploadProduct = (data) => async (dispatch) => {
    console.log(data);
    dispatch({ type: "UPLOAD_START" })
    try {
        const newPost = await UploadApi.uploadProduct(data)
        console.log(newPost);
        dispatch({ type: "UPLOAD_SUCCESS" ,data:newPost.data})
    } catch (error) {
        console.log(error);
        dispatch({ type: "UPLOAD_FAIL" })
    }
}