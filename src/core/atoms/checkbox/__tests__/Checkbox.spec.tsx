import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('<Checkbox />', () => {
  it('should render correctly in the default state', () => {
    // ACT
    const wrapper = render(<Checkbox id="example" label="Label" />).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correctly with optional props', () => {
    // ACT
    const wrapper = render(
      <Checkbox
        className="custom-class-name"
        dataTestId="data-testid"
        id="chechbox-id"
        name="chechbox-name"
        disabled
        invalid
        outline
        label="Label"
      />,
    ).container;

    // ASSERT
    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to be used in controlled mode', () => {
    // ARRANGE
    const onChange = jest.fn();

    // ACT
    render(<Checkbox id="example" label="Label" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Label'));

    // ASSERT
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
