import React from 'react';
import { shallow } from 'enzyme';
import Form from '..';

describe('<Form />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = shallow(
      <Form>
        <p>Hello World!</p>
      </Form>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly in the invalid state', () => {
    // ACT
    const wrapper = shallow(
      <Form invalid>
        <p>Hello World!</p>
      </Form>,
    );

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should call `onSubmit` when submitting', () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const wrapper = shallow(
      <Form onSubmit={onSubmit}>
        <p>Hello World!</p>
      </Form>,
    );

    wrapper.simulate('submit');

    // ASSERT
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
