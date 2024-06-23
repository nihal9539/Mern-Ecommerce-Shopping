// actions.js
import { toast } from "react-toastify";
import * as ProductApi from "../api/ProductRequest"


export const setAddToButtonTrue = () => {
  return dispatch => {
    dispatch({ type: "SET_ADD_TO_BUTTON_TRUE" });
  };
};

export const setAddToButtonFalse = () => {
  return dispatch => {
    dispatch({ type: "SET_ADD_TO_BUTTON_FALSE" });
  };
};

export const getAllProduct = () => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" })
  try {
    const data = await ProductApi.allProduct()
    dispatch({ type: "RETREIVING_SUCCESS", data: data.data })
  } catch (error) {
    toast.error(error?.response?.data)
    dispatch({ type: "RETREIVING_FAIL" })


  }
}
export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: "PRODUCT_FETCHING_START" })
  try {
    const data = await ProductApi.getProductById(id)
    dispatch({ type: "PRODUCT_FETCHING_SUCCESS", data: data.data })
  } catch (error) {
    toast.error(error?.response?.data)
    dispatch({ type: "PRODUCT_FETCHING_FAIL" })


  }
}
export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: "PRODUCT_DELETE_START" })
  try {
    await ProductApi.deleteProduct(productId)
    dispatch({ type: "PRODUCT_DELETE_SUCCESS", data: productId })
    toast.success("Product deleted successfully")
  } catch (error) {

    toast.error(error?.response?.data)
    dispatch({ type: "PRODUCT_DELETE_FAIL" })

  }
}


export const updateProduct = (id, formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_UPDATE_START" })
    const data = await ProductApi.updateProduct(id, formData)
    dispatch({ type: "PRODUCT_UPDATE_SUCCESS", data: data.data })
    navigate('/products')

  } catch (error) {
    toast.error(error?.response?.data);
    dispatch({ type: "PRODUCT_UPDATE_FAIL" });

  }
}