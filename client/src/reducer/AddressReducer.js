const addressReducer =
    (state = { addressData: null, loading: false,  error: false,  }, action) => {
        switch (action.type) {
            case "ADDRESS_START":
                return { ...state, loading: true, error: false, }
            case 'ADDRESS_SUCCESS':
                return { ...state, addressData: action.data, loading: false, error: false }
            case 'ADDRESS_ERROR':
                return { ...state, loading: false,  error: true, }           
            default:
                return state
        }
    }

export default addressReducer;