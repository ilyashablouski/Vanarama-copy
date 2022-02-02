import React from 'react';
import { render } from '@testing-library/react';
import Formgroup from '../Formgroup';

describe('<Formgroup />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = render(
      <Formgroup label="Label text">
        <p>Some child</p>
      </Formgroup>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom CSS class name', () => {
    // ACT
    const wrapper = render(
      <Formgroup className="some-custom-class" label="Label text">
        <p>Some child</p>
      </Formgroup>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when inline', () => {
    // ACT
    const wrapper = render(
      <Formgroup inline label="Label text">
        <p>Some child</p>
      </Formgroup>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with an error', () => {
    // ACT
    const wrapper = render(
      <Formgroup error="You must select an option" label="Label text">
        <p>Some child</p>
      </Formgroup>,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
