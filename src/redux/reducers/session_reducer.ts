import { IS_AUTHENTICATED } from "../types"

const initialState = {
  isAuthenticated: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      const {authenticated} = action.payload
      return { ...state, isAuthenticated: authenticated }
    default:
      return state
  }
}
