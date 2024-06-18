const authReducer =
    (state = { authData: null, loading: false, errorMessage: "", error: false, updateLoading: true }, action) => {
        switch (action.type) {
            case "AUTH_START":
            case "UPDATE_START":
                return { ...state, loading: true, error: false, errorMessage: null }
            case 'AUTH_SUCESS':
            case 'UPDATE_SUCCESS':
                localStorage.setItem('user', JSON.stringify({ ...action?.data }));
                return { ...state, authData: action.data, errorMessage: null, loading: false, error: false }
            case 'AUTH_ERROR':
            case 'UPDATE_FAIL':
                return { ...state, loading: false, errorMessage: action.data, error: true, }
            case 'LOG_OUT':
                localStorage.clear();

                return { ...state, loading: false, error: false, authData: null }
            default:
                return state
        }
    }

export default authReducer