import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { error, info, success, ToastContainer, warning } from '../Toast';

describe('Toast', () => {
  it('should render error toasts correctly', async () => {
    const { container } = render(<ToastContainer />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    error('Error Title', 'Error message');

    // ASSERT
    await waitFor(() => {
      expect(
        container.querySelector('.Toastify__toast--error'),
      ).toBeInTheDocument();
      expect(screen.getByText('Error Title')).toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });
  });

  it('should render info toasts correctly', async () => {
    const { container } = render(<ToastContainer />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    info('Info Title', 'Info message');

    // ASSERT
    await waitFor(() => {
      expect(
        container.querySelector('.Toastify__toast--info'),
      ).toBeInTheDocument();
      expect(screen.getByText('Info Title')).toBeInTheDocument();
      expect(screen.getByText('Info message')).toBeInTheDocument();
    });
  });

  it('should render warning toasts correctly', async () => {
    const { container } = render(<ToastContainer />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    warning('Warning Title', 'Warning message');

    // ASSERT
    await waitFor(() => {
      expect(
        container.querySelector('.Toastify__toast--warning'),
      ).toBeInTheDocument();
      expect(screen.getByText('Warning Title')).toBeInTheDocument();
      expect(screen.getByText('Warning message')).toBeInTheDocument();
    });
  });

  it('should render success toasts correctly', async () => {
    const { container } = render(<ToastContainer />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    success('Success Title', 'Success message');

    // ASSERT
    await waitFor(() => {
      expect(
        container.querySelector('.Toastify__toast--success'),
      ).toBeInTheDocument();
      expect(screen.getByText('Success Title')).toBeInTheDocument();
      expect(screen.getByText('Success message')).toBeInTheDocument();
    });
  });
});
