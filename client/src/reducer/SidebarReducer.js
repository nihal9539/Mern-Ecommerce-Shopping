// reducer.js

const initialState = {
  sidebarAction: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BUTTON_TRUE":
      return {
        sidebarAction: true,
      };
    case "SET_BUTTON_FALSE":
      return {
        sidebarAction: false,
      };
    default:
      return state;
  }
};

export default reducer;
