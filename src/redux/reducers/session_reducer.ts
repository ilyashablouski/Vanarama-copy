import { IS_AUTHENTICATED, TMP_USER_EMAIL } from "../types"

const initialState = {
  isAuthenticated: false,
  currenSessionData: {},
  userEmail: "",
}

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      const { isAuthenticated, currenSessionData } = action.payload
      return { ...state, isAuthenticated, currenSessionData }
    case TMP_USER_EMAIL:
      const { userEmail } = action.payload
      return { ...state, userEmail }
    default:
      return state
  }
}
