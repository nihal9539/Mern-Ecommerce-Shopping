// actions.js

export const setAddToButtonTrue = () => {
    return dispatch => {
      dispatch({ type: "SET_ADD_TO_BUTTON_TRUE"});
    };
  };
  
  export const setAddToButtonFalse = () => {
    return dispatch => {
      dispatch({ type: "SET_ADD_TO_BUTTON_FALSE" });
    };
  };
  