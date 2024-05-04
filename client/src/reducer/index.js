import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import sidebarReducer from "./SidebarReducer";


export const reducers = combineReducers({authReducer,sidebarReducer})