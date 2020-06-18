import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MockedResponse, MockedProvider } from '@apollo/client/testing';
import ThankYouPage from '../../../pages/olaf/thank-you';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/olaf/thank-you',
      push: mockPush,
    };
  },
}));

jest.mock('../../../hooks/useMediaQuery');
jest.mock('../../../gql/order');

describe('<ThankYouPage />', () => {
  it('should redirect to the home page when clicking the "View order" button', () => {
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
    expect(mockPush).toBeCalledTimes(1);
    expect(mockPush).toBeCalledWith('/');
  });
});
