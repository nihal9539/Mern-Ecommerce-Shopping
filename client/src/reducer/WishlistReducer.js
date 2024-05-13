const reducer = (state = { wishlist: null, loading: false, error: false }, action) => {

    switch (action.type) {
        case "WISHLIST_UPLOAD_START":
            return { ...state, error: false, loading: true }
        case "WISHLIST_UPLOAD_SUCCESS":
            return { ...state, error: false, loading: false, wishlist: [action.data, ...state.wishlist] }
        case "WISHLIST_UPLOAD_FAIL":
            return { ...state, error: true, loading: false }
        case "WISHLIST_START":
            return { ...state, error: false, loading: true }
        case "WISHLIST_SUCCESS":
            return { ...state, error: false, loading: false, wishlist: action.data }
        case "WISHLIST_FAIL":
            return { ...state, error: true, loading: false }

        default:
            return state;
    }
}


export default reducer;
