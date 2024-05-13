import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import sidebarReducer from "./SidebarReducer";
import productReducer from "./ProductReducer";
import wishlistRroducer from "./WishlistReducer";


export const reducers = combineReducers({authReducer,sidebarReducer,productReducer,wishlistRroducer})