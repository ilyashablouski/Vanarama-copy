import Index from "../../components/Nav"
import * as React from "react"
import { shallow } from "enzyme"

describe("<Index /> rendering", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Index />)
  })

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
