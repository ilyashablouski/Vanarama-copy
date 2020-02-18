import LoginPage from '../../pages/login';
import * as React from 'react';
import { shallow } from 'enzyme';

describe('<LoginPage /> rendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LoginPage />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  /* it("should render one <title>", () => {
    expect(wrapper.find("title")).toHaveLength(1)
  }) */
});
