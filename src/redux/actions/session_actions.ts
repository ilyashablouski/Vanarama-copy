import { IS_AUTHENTICATED, TMP_USER_EMAIL } from "../types"

export const updateSession = (
  isAuthenticated: boolean,
  currentSessionData: object,
) => {
  return (dispatch) => {
    console.log("successful login")
    return dispatch({
      type: IS_AUTHENTICATED,
      payload: { isAuthenticated, currentSessionData },
    })
  }
}

export const captchaUserEmail = (
    userEmail: string
) => {
    return (dispatch) => {
        return dispatch({
            type: TMP_USER_EMAIL,
            payload: userEmail
        })
    }
}
