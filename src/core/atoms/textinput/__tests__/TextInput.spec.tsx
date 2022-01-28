import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import TextInput from '../TextInput';

describe('<TextInput />', () => {
  it('should render correctly in the default state', () => {
    // ACT
    const wrapper = render(<TextInput />);

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should render correctly with optional props', () => {
    // ACT
    const wrapper = render(
      <TextInput
        calculated
        className="custom-class-name"
        dataTestId="data-testid"
        id="input-id"
        name="input-name"
        placeholder="Placeholder"
        prefix="£"
        width="50ch"
      />,
    );

    // ASSERT
    expect(wrapper.container).toMatchSnapshot();
  });

  it('should be able to be used in controlled mode', () => {
    // ARRANGE
    const onChange = jest.fn();

    // ACT
    render(<TextInput onChange={onChange} placeholder="Placeholder" />);
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), {
      target: { value: 'A' },
    });
    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render correctly with a suffix', () => {
    // ACT
    const wrapper = render(<TextInput suffix="%" />);

    // ASSERT
    expect(wrapper.container).toMatchInlineSnapshot(`
      <div>
        <div
          class="textinput regular"
        >
          <input
            class="textinput--native regular -suffix"
            type="text"
          />
          <span
            class="text textinput--suffix -regular -dark"
          >
            %
          </span>
        </div>
      </div>
    `);
  });
});
