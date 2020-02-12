import { INIT } from "../types"

export const init = (bool: boolean) => {
  return (dispatch) => {
    return dispatch({ type: INIT, payload: bool })
  }
}
