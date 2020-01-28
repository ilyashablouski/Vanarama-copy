import Head from "components/Head"
import * as React from "react"
import { shallow } from "enzyme"

describe("<HEAD /> rendering", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Head />)
  })

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })

  it("should render one <title>", () => {
    expect(wrapper.find("title")).toHaveLength(1)
  })
})
