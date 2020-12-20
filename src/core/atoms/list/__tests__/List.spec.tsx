import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import List from '../List';

describe('<List />', () => {
  it('should render children correctly', () => {
    // ACT
    render(
      <List>
        <li>Some children</li>
      </List>,
    );

    // ASSERT
    expect(screen.getByText('Some children')).toBeInTheDocument();
  });

  it('should render correctly with a CSS class', () => {
    // ACT
    render(<List className="custom-class-name" />);

    // ASSERT
    expect(screen.getByRole('list')).toHaveAttribute(
      'class',
      'list custom-class-name',
    );
  });

  it('should render correctly with an automation ID', () => {
    // ACT
    render(<List dataTestId="my-testid" />);

    // ASSERT
    expect(screen.getByRole('list')).toHaveAttribute(
      'data-testid',
      'my-testid',
    );
  });

  it('should pass other props to the root node', () => {
    // ARRANGE
    const onClickMock = jest.fn();

    // ACT
    render(<List onClick={onClickMock} aria-label="My special list" />);
    fireEvent.click(screen.getByRole('list'));

    // ASSERT
    expect(onClickMock).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('list')).toHaveAttribute(
      'aria-label',
      'My special list',
    );
  });
});
