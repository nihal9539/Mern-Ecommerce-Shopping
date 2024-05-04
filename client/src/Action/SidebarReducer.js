// actions.js

export const setButtonTrue = () => {
  return dispatch => {
    dispatch({ type: "SET_BUTTON_TRUE"});
  };
};

export const setButtonFalse = () => {
  return dispatch => {
    dispatch({ type: "SET_BUTTON_FALSE" });
  };
};
