import * as React from "react"
import { mount } from "enzyme"
import IndexPage from "../pages/index"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import configureStore from "redux-mock-store"
import { init } from "../redux/actions/initActions"
import { withTestRouter } from "./withTestRouter.hoc"

describe("Index --- REACT-REDUX (Mount + wrapping in <Provider>)", () => {
  const initialState = { initialize: { helloWorld: false } }
  const mockStore = configureStore([thunk])
  let store, wrapper

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = mount(
      withTestRouter(
        <Provider store={store}>
          <IndexPage />
        </Provider>,
      ),
    )
  })

  it("should render without throwing an error", () => {
    expect(wrapper.find("div").text()).toBe("Next Storefront intialized")
  })
})
