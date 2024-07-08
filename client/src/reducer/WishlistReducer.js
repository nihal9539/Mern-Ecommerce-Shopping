const reducer = (state = { wishlist: [], loading: false, error: false }, action) => {

    switch (action.type) {
        case "WISHLIST_UPLOAD_START":
        case "WISHLIST_REMOVE_START":
        case "WISHLIST_FETCH_START":
            return { ...state, error: false, loading: true }
        case "WISHLIST_UPLOAD_SUCCESS":
            return { ...state, error: false, loading: false, wishlist: action.data }
        case "WISHLIST_UPLOAD_FAIL":
            return { ...state, error: true, loading: false }
        case "WISHLIST_REMOVE_SUCCESS":
            return { ...state, error: false, loading: false, wishlist: state.wishlist.filter(item => item !== action.data) }
        case "WISHLIST_REMOVE_FAIL":
            return { ...state, error: true, loading: false }
        case "WISHLIST_FETCH_SUCCESS":
            return { ...state, error: false, loading: false, wishlist: action.data }
        case "WISHLIST_FETCH_FAIL":
            return { ...state, error: true, loading: false,wishlist:[] }

        case "WISHLIST_RESET":
            return { ...state, error: false, loading: false, wishlist: [] }

        default:
            return state;
    }
}


export default reducer;
