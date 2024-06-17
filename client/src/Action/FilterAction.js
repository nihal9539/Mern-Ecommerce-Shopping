export const genderFilter = (data) => async (dispatch) => {

  dispatch({ type: "GENDER_FILTER", data: data })

}
export const resetFilter = (data) => async (dispatch) => {

  dispatch({ type: "FILTER_RESET" })

}

export const priceFilter = (data) => (dispatch) => {
  dispatch({ type: "PRICE_FILTER",data:data })
}