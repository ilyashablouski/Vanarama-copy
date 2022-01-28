import React from 'react';
import { render } from '@testing-library/react';
import FormError from '../FormError';

describe('<FormError />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = render(
      <FormError>Some terrible error has occurred!</FormError>,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });
});
