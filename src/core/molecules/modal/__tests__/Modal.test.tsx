import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('<Modal />', () => {
  it('should render title and text correctly', () => {
    // ACT
    render(
      <Modal
        show
        onRequestClose={jest.fn()}
        title="testing modal"
        text="testing text for modal"
      />,
    );

    expect(screen.getByText('testing modal')).toBeInTheDocument();
    expect(screen.getByText('testing text for modal')).toBeInTheDocument();
  });

  it('should render not showing modal', () => {
    // ACT
    render(<Modal show={false} onRequestClose={jest.fn()} />);

    // ASSERT
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'class',
      'modal-wrap :target',
    );
  });

  it('should render showing modal', () => {
    // ACT
    render(<Modal show onRequestClose={jest.fn()} />);

    // ASSERT
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'class',
      'modal-wrap :target -open',
    );
  });

  it('should call onRequestClose when clicking the close icon', () => {
    // ACT
    const onRequestCloseMock = jest.fn();
    render(<Modal show onRequestClose={onRequestCloseMock} />);
    fireEvent.click(screen.getByTestId('close'));
    // ASSERT
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should call onRequestClose when user presses escape key', () => {
    // ACT
    const onRequestCloseMock = jest.fn();
    render(<Modal show onRequestClose={onRequestCloseMock} />);
    fireEvent.keyDown(document, { keyCode: 27 });
    // ASSERT
    expect(onRequestCloseMock).toHaveBeenCalledTimes(1);
  });

  it('should render children correctly', () => {
    // ACT
    render(
      <Modal show onRequestClose={jest.fn()}>
        children
      </Modal>,
    );
    // ASSERT
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
