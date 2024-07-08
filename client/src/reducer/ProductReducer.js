// reducer.js

const reducer = (state = {
  addToButton: false, product: null, products: [], loading: false, error: false, uploading: false
}, action) => {

  switch (action.type) {
    case "SET_ADD_TO_BUTTON_TRUE":
      return {
        addToButton: true,
      };
    case "SET_ADD_TO_BUTTON_FALSE":
      return {
        addToButton: false,
      };
    case "RETREIVING_START":
    case "PRODUCT_FETCHING_START":
    case "PRODUCT_UPDATE_START":
      return { ...state, loading: true, error: false };
    // upload
    case "UPLOAD_START":
      return { ...state, loading: true, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return { ...state, loading: false, products: [action.data, ...state.products], uploading: false, error: false };
    case "UPLOAD_FAIL":
      return { ...state, loading: false, uploading: false, error: true };
    // all product
    case "RETREIVING_SUCCESS":
      return { ...state, products: action.data, loading: false, error: false };
    //  product by id
    case "PRODUCT_FETCHING_SUCCESS":
      return { ...state, product: action.data, loading: false, error: false };
    case "PRODUCT_UPDATE_SUCCESS":
      return {
        ...state, products: state.products.map(product =>
          product._id === action.data._id ? action.data : product
        )
        , loading: false, error: false
      };
    // Delete
    case "PRODUCT_DELETE_START":
      return { ...state, loading: true, error: false };
    case "PRODUCT_DELETE_SUCCESS":
      return { ...state, loading: false, products: state.products.filter(item => item._id !== action.data), uploading: false, error: false };
    case "PRODUCT_DELETE_FAIL":
      return { ...state, loading: false, error: true };
    case "RETREIVING_FAIL":
    case "PRODUCT_UPDATE_FAIL":
      return { ...state, loading: false, error: true };
    case "PRODUCT_FETCHING_FAIL":
      return { ...state, loading: false, error: true, product: [] };

    default:
      return state;
  }
};

export default reducer;
