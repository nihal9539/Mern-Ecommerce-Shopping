export const genderFilter = (data) => async (dispatch) => {

  dispatch({ type: "GENDER_FILTER", data: data })

}
export const resetFilter = () => async (dispatch) => {

  dispatch({ type: "FILTER_RESET" })

}

export const priceFilter = (data) => (dispatch) => {
  dispatch({ type: "PRICE_FILTER",data:data })
}
export const categoryFilterAction = (data) => async(dispatch) => {
  dispatch({ type: "CATEGORY_FILTER",data:data })
}
export const getFilter = ()=>(dispatch)=>{
  dispatch({ type: "GET_FILTER" })
}