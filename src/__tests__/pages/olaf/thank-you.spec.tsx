import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThankYouPage from '../../../pages/olaf/thank-you';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: mockPush,
    };
  },
}));

describe('<ThankYouPage />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should redirect to the home page when clicking the "View order" button', () => {
    // ACT
    render(<ThankYouPage />);

    // Click the "View order" button
    fireEvent.click(screen.getByText(/View order/));

    // ASSERT
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toBeCalledWith('/');
  });
});
