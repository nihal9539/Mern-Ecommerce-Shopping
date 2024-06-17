const FilterReducer = (state = {
    gender: [], minPrice: [],
    maxPrice: []
}, action) => {

    switch (action.type) {

        case "GENDER_FILTER":
            if (state.gender.includes(action.data)) {
                return { ...state, gender: state.gender.filter(g => g !== action.data) }
            } else {
                return { ...state, gender: [...state.gender, action.data] }
            }
        case "FILTER_RESET":
            return { state, gender: [], minPrice: [], maxPrice: [] }

        case "PRICE_FILTER":
            const newMinPrice = state.minPrice?.includes(action.data.minPrice)
                ? state.minPrice.filter(price => price !== action.data.minPrice)
                : [...state.minPrice, action.data.minPrice].sort((a, b) => a - b);
            const newMaxPrice = state.maxPrice?.includes(action.data.maxPrice)
                ? state.maxPrice.filter(price => price !== action.data.maxPrice)
                : [...state.maxPrice, action.data.maxPrice].sort((a, b) => b - a);
            return { ...state, minPrice: newMinPrice, maxPrice: newMaxPrice }

        default:
            return state;
    }
}

export default FilterReducer;