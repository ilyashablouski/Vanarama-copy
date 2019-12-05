import Router from "next/router"
import { INIT } from "../types"

export const init = (bool) => {
  return (dispatch) => {
    return dispatch({ type: INIT, payload: bool })
  }
}
