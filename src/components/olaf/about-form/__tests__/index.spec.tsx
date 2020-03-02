import * as React from 'react';
import { shallow, mount } from 'enzyme';
import AboutForm from '../AboutForm';

describe('<AboutForm />', () => {
  it('renders correctly', () => {
    const stubData = {
      data: { allDropdowns: {} },
    };
    const wrapper = shallow(<AboutForm allDropDowns={stubData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
