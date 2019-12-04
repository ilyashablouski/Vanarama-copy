import Router from "next/router"
import { INIT } from "../types"

export const init = (bool) => {
  return async (dispatch) => {
    return dispatch({ type: INIT, bool })
  }
}
