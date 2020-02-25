import { INIT } from "../types"

export const init = (bool: boolean) => {
  console.info('sdsfsfsdf: ');
  return (dispatch) => {
    return dispatch({ type: INIT, payload: bool })
  }
}
