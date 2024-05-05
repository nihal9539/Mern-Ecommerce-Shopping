// reducer.js

const initialState = {
    addToButton: false,
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
      default:
        return state;
    }
  };
  
  export default reducer;
  