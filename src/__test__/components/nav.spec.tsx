import Nav from "../../components/Nav"
import * as React from "react"
import { shallow } from "enzyme"

describe("<Nav /> rendering", () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Nav />)
  })

  it("renders correctly", () => {
    expect(wrapper).toMatchSnapshot()
  })
})
