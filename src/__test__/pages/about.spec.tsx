import * as React from 'react';
import AboutPage from '../../pages/olaf/about';
import { shallow } from 'enzyme';

describe('Olaf <AboutPage /> rendering', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AboutPage />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  /* it("should render one <title>", () => {
    expect(wrapper.find("title")).toHaveLength(1)
  }) */
});
