import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ThankYouPage from '../../../pages/olaf/thank-you';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/olaf/thank-you',
      prefetch: () => null,
      push: mockPush,
    };
  },
}));

jest.mock('../../../hooks/useMediaQuery');

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
