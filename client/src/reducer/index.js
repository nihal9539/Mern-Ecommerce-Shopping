import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import sidebarReducer from "./SidebarReducer";
import productReducer from "./ProductReducer";
import wishlistReducer from "./WishlistReducer";


export const reducers = combineReducers({authReducer,sidebarReducer,productReducer,wishlistReducer})