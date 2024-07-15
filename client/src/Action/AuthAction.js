import * as AuthAPI from "../api/AuthRequest"
import * as AdminApi from "../api/AdminRequest"
import { toast } from "react-toastify"


export const login = (formData) => async (dispatch) => {

    dispatch({ type: 'AUTH_START' });
    try {
        const res = await AuthAPI.login(formData);
        dispatch({ type: 'AUTH_SUCESS', data: res.data });
    } catch (err) {
        dispatch({ type: 'AUTH_ERROR', data: err.response.data });
    }
}

export const signup = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthAPI.signup(formData);
        dispatch({ type: 'AUTH_SUCESS', data: data });
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', data: error.response.data });
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: "LOG_OUT" })
}

export const adminLogin = (formData) => async (dispatch) => {

    dispatch({ type: 'ADMIN_LOGIN_START' });
    try {
        const res = await AdminApi.AdminLogin(formData);
        dispatch({ type: 'AUTH_LOGIN_SUCESS', data: res.data });

    } catch (err) {
        toast.error(err.response.data)
        dispatch({ type: 'AUTH_LOGIN_ERROR', data: err.response.data });
    }
}
export const adminLogout = () => async (dispatch) => {
    dispatch({ type: "ADMIN_LOG_OUT" })
}


