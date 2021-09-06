import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ModalV2 from '../ModalV2';

describe('<Modal />', () => {
  it('should render not showing modal', () => {
    // ACT
    render(
      <ModalV2 open={false} onClose={jest.fn()}>
        children
      </ModalV2>,
    );

    // ASSERT
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should render showing modal', () => {
    // ACT
    render(
      <ModalV2 open onClose={jest.fn()}>
        children
      </ModalV2>,
    );

    // ASSERT
    expect(screen.getByRole('dialog')).toHaveAttribute(
      'class',
      'modal-v2 -open',
    );
  });

  it('should call onClose when clicking the close button', () => {
    // ACT
    const handleClose = jest.fn();
    render(
      <ModalV2 open onClose={handleClose}>
        children
      </ModalV2>,
    );

    fireEvent.click(screen.getByTestId('close'));

    // ASSERT
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when user presses escape key', () => {
    // ACT
    const handleClose = jest.fn();
    render(
      <ModalV2 open onClose={handleClose}>
        children
      </ModalV2>,
    );

    fireEvent.keyDown(document, {
      key: 'Escape',
    });

    // ASSERT
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should render children correctly', () => {
    // ACT
    render(
      <ModalV2 open onClose={jest.fn()}>
        children
      </ModalV2>,
    );

    // ASSERT
    expect(screen.getByText('children')).toBeInTheDocument();
  });
});
