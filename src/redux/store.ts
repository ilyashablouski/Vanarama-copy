import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducers from "./reducers"

export const initStore = (initialState = {}) => {
  return createStore(
    reducers,
    initialState,
    process.env.NODE_ENV === "development" &&
      composeWithDevTools(applyMiddleware(thunk)),
  )
}
