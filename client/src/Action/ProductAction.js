// actions.js
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
    dispatch({ type: "RETREIVING_FAIL" })
    console.log(error);

  }
}
export const getProduct = () => async (dispatch) => {
  dispatch({ type: "PRODUCT_FETCHING_START" })
  try {
    const data = await ProductApi.allProduct()
    dispatch({ type: "PRODUCT_FETCHING_SUCCESS", data: data.data })
  } catch (error) {
    dispatch({ type: "PRODUCT_FETCHING_FAIL" })
    console.log(error);

  }
}