import React from 'react';
import { shallow } from 'enzyme';
import FormError from '../FormError';

describe('<FormError />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <FormError>Some terrible error has occurred!</FormError>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
