import { TOGGLE_PRODUCT, ENTER_PRODUCT, LEAVE_PRODUCT } from "./types"

const handlers = {
  DEFAULT: (state) => state,
  [TOGGLE_PRODUCT]: (state, {payload}) => payload,
  [ENTER_PRODUCT]: (state, {payload}) => payload,
  [LEAVE_PRODUCT]: (state, {payload}) => payload
}



const productsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}

export default productsReducer
