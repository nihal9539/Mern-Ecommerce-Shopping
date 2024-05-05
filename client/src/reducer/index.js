import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import sidebarReducer from "./SidebarReducer";
import productReducer from "./ProductReducer";


export const reducers = combineReducers({authReducer,sidebarReducer,productReducer})