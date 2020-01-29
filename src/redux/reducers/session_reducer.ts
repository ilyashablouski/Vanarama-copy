import { IS_AUTHENTICATED } from "../types"

const initialState = {
  isAuthenticated: false,
  currenSessionData: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      const {isAuthenticated, currenSessionData} = action.payload
      return { ...state, isAuthenticated, currenSessionData }
    default:
      return state
  }
}
