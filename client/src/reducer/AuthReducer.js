const authReducer =
    (state = { authData: null, admin: null, loading: false, errorMessage: "", error: false, updateLoading: true }, action) => {
        switch (action.type) {
            case "AUTH_START":
            case "UPDATE_START":
            case 'ADMIN_LOGIN_START':
                return { ...state, loading: true, error: false, errorMessage: null }
            case 'AUTH_SUCESS':
            case 'UPDATE_SUCCESS':
                localStorage.setItem('user', JSON.stringify({ ...action?.data }));
                return { ...state, authData: action.data, errorMessage: null, loading: false, error: false }
            case 'AUTH_LOGIN_SUCESS':
                localStorage.setItem('admin', JSON.stringify({ ...action?.data }));
                return { ...state, admin: action.data, errorMessage: null, loading: false, error: false }
            case 'AUTH_ERROR':
            case 'UPDATE_FAIL':
            case 'AUTH_LOGIN_ERROR':
                return { ...state, loading: false, errorMessage: action.data, error: true, }
            case 'LOG_OUT':
                localStorage.removeItem('user');

                return { ...state, loading: false, error: false, authData: null }
            case 'ADMIN_LOG_OUT':
                localStorage.removeItem('admin');

                return { ...state, loading: false, error: false, admin: null }
            default:
                return state
        }
    }

export default authReducer