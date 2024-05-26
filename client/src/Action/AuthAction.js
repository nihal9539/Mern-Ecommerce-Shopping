import * as AuthAPI from "../api/AuthRequest"


export const login = (formData) => async (dispatch) => {
    console.log(formData);
    console.log("res");
    dispatch({ type: 'AUTH_START' });
    try {
        const res = await AuthAPI.login(formData);  
        dispatch({ type: 'AUTH_SUCESS', data: res.data });
    } catch (err) {
        console.log(err.response.data);
        dispatch({ type: 'AUTH_ERROR', data: err.response.data });
    }
}

export const signup = (formData) => async (dispatch) => {
    dispatch({ type: 'AUTH_START' });
    try {
        const { data } = await AuthAPI.signup(formData);
        dispatch({ type: 'AUTH_SUCESS', data: data });
    } catch (error) {
        dispatch({ type: 'AUTH_ERROR', data: error.response.data  });
    }
}

export const logout = ()=> async(dispatch)=>{
    dispatch({type:"LOG_OUT"})
}