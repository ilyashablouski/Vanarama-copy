import { INIT } from "../types"

const initialState = {
  helloWorld: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return { ...state, helloWorld: action.payload }
    default:
      return state
  }
}
