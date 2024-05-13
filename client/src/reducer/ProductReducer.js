// reducer.js

const reducer = (state = {
  addToButton: false,
  products: null, loading: false, error: false, uploading: false
}, action) => {
  console.log(state);

  switch (action.type) {
    case "SET_ADD_TO_BUTTON_TRUE":
      return {
        addToButton: true,
      };
    case "SET_ADD_TO_BUTTON_FALSE":
      return {
        addToButton: false,
      };
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return { ...state, products: [action.data, ...state.products], uploading: false, error: false };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    case "RETREIVING_START":
      console.log(state);
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      console.log(action);
      return { ...state, products: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    // case "PRODUCT_FETCHING_START":
    //   console.log(state);
    //   return { ...state, loading: true, error: false };
    // case "PRODUCT_FETCHING_SUCCESS":
    //   console.log(action);
    //   return { ...state, product: action.data, loading: false, error: false };
    // case "PRODUCT_FETCHING_FAIL":
    //   return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default reducer;
