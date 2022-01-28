import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Form from '..';

describe('<Form />', () => {
  it('should render correctly', () => {
    // ACT
    const wrapper = render(
      <Form>
        <p>Hello World!</p>
      </Form>,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render correctly in the invalid state', () => {
    // ACT
    const wrapper = render(
      <Form invalid>
        <p>Hello World!</p>
      </Form>,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should call `onSubmit` when submitting', () => {
    // ARRANGE
    const onSubmit = jest.fn();

    // ACT
    const { container } = render(
      <Form onSubmit={onSubmit}>
        <p>Hello World!</p>
      </Form>,
    );
    fireEvent.submit(container.getElementsByTagName('form')[0]);
    // ASSERT
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
