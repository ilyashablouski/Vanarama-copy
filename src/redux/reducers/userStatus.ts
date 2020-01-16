import { IS_AUTHENTICATED } from "../types"

const initialState = {
  isAuthenticated: false,
}

export default (state = initialState, action) => {
  const {authenticated} = action.payload
  switch (action.type) {
    case IS_AUTHENTICATED:
      return { ...state, isAuthenticated: authenticated }
    default:
      return state
  }
}
