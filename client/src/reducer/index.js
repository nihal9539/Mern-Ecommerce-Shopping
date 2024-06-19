import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import sidebarReducer from "./SidebarReducer";
import productReducer from "./ProductReducer";
import wishlistReducer from "./WishlistReducer";
import cartReducer from "./CartReducer";
import addressReducer from "./AddressReducer";
import paymentReducer from "./PaymentReducer";
import orderReducer from "./OrderReducer";
import filterReducer from "./FilterReducer";


export const reducers = combineReducers({ authReducer, sidebarReducer, productReducer, addressReducer, wishlistReducer, cartReducer, paymentReducer, orderReducer,filterReducer })

export const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
      state = undefined; // Reset the entire state
    }
    return reducers(state, action);
  };


// export  rootReducer;