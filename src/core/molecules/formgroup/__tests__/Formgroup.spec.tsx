import React from 'react';
import { shallow } from 'enzyme';
import Formgroup from '../Formgroup';

describe('<Formgroup />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <Formgroup label="Label text">
        <p>Some child</p>
      </Formgroup>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with a custom CSS class name', () => {
    // ACT
    const wrapper = shallow(
      <Formgroup className="some-custom-class" label="Label text">
        <p>Some child</p>
      </Formgroup>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly when inline', () => {
    // ACT
    const wrapper = shallow(
      <Formgroup inline label="Label text">
        <p>Some child</p>
      </Formgroup>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with an error', () => {
    // ACT
    const wrapper = shallow(
      <Formgroup error="You must select an option" label="Label text">
        <p>Some child</p>
      </Formgroup>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });
});
