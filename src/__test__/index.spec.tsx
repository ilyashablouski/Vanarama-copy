import * as React from "react"
import { mount, shallow } from "enzyme"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import configureStore from "redux-mock-store"
import { init } from "../redux/actions/initActions"
import { withTestRouter } from "../test-utils/withTestRouter.hoc"
import { INIT } from "../redux/types"

import IndexPage from "../pages/index"

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

  it("dispatches correct action & payload", () => {
    store.clearActions()
    store.dispatch(init(true))
    const actions = store.getActions()
    expect(actions).toEqual([
      {
        type: INIT,
        payload: true,
      },
    ])
  })

  it("should display correct default text", () => {
    expect(wrapper.find(".init p").text()).toBe(":(")
  })
})
