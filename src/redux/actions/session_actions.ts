import { IS_AUTHENTICATED } from "../types"

export const updateSession = (
  isAuthenticated: boolean,
  updatedSession: object,
) => {
  return (dispatch) => {
    return dispatch({
      type: IS_AUTHENTICATED,
      payload: { isAuthenticated, updatedSession },
    })
  }
}
