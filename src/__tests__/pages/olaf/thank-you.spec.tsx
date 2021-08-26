import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import { makeGetCreditApplicationMock } from '../../../gql/creditApplication';
import ThankYouPage from '../../../pages/olaf/thank-you';

const MOCK_ORDER_ID = '11111111-b980-46bd-8a8e-ed82705b3e01';

const getCreditApplication = makeGetCreditApplicationMock(MOCK_ORDER_ID);

const mockPush = jest.fn();
jest.mock('../../../layouts/OLAFLayout/OLAFLayout');
jest.mock('../../../hooks/useGetOrderId', () =>
  jest.fn().mockImplementation(() => MOCK_ORDER_ID),
);
jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/olaf/thank-you/[orderId]',
      push: mockPush,
      query: {},
    };
  },
}));

async function waitForLoadingFinish() {
  await waitFor(() =>
    expect(screen.getByTestId('thank-you_heading')).toBeInTheDocument(),
  );
}

describe('<ThankYouPage />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  it('should redirect to the home page when clicking the "View order" button', async () => {
    // ARRANGE
    const mocks: MockedResponse[] = [getCreditApplication];

    // ACT
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ThankYouPage />
      </MockedProvider>,
    );

    await waitForLoadingFinish();

    // Click the "View order" button
    fireEvent.click(screen.getByText(/View order/));

    // ASSERT
    await waitFor(() => expect(mockPush).toBeCalledTimes(1));
    expect(mockPush).toBeCalledWith(
      '/account/login-register?redirect=/account/my-orders',
      '/account/login-register',
    );
  });
});
