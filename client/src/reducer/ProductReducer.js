// reducer.js

const initialState = {
  addToButton: false,
  posts: null, loading: false, error: false, uploading: false
};

const reducer = (state = initialState, action) => {
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
      return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default reducer;
