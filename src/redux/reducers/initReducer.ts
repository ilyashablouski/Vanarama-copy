import { INIT } from "../types"

const initialState = {
  helloWorld: false,
}

export default (state = initialState, action) => {
  switch (action.payload) {
    case INIT:
      return { ...state, init: action.payload }
    default:
      return state
  }
}
