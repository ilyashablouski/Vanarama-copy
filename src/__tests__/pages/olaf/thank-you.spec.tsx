import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import ThankYouPage from '../../../pages/olaf/thank-you/[orderId]';

jest.mock('../../../layouts/OLAFLayout/OLAFLayout');
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/olaf/thank-you/[orderId]',
      push: mockPush,
      query: {},
    };
  },
}));

describe('<ThankYouPage />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should redirect to the home page when clicking the "View order" button', async () => {
    // ARRANGE
    const mocks: MockedResponse[] = [];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThankYouPage />
      </MockedProvider>,
    );

    // Click the "View order" button
    fireEvent.click(screen.getByText(/View order/));

    // ASSERT
    await waitFor(() => expect(mockPush).toBeCalledTimes(1));
    expect(mockPush).toBeCalledWith(
      '/account/login-register?redirect=/account/my-orders',
    );
  });
});
