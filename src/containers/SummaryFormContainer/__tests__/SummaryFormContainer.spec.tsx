import { MockedProvider } from '@apollo/client/testing';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import SummaryFormContainer from '../SummaryFormContainer';
import createBruceData from '../__fixtures__/bruceData';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: mockPush,
    };
  },
}));

const ORDER_ID = '17596f47-adf5-4e63-b250-238102cb831c';

describe('<SummaryFormContainer />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  it('should render company details correctly', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('Your Details');

    // ASSERT
    expect(screen.getByTestId(/summary-email-address/)).toHaveTextContent(
      'brucey-bonus@forsyth.com',
    );

    expect(screen.getByTestId(/summary-fullname/)).toHaveTextContent(
      'Mr. Bruce Forsyth',
    );

    expect(screen.getByTestId(/summary-mobile/)).toHaveTextContent(
      '07733311122',
    );

    expect(screen.getByTestId(/summary-dob/)).toHaveTextContent('22/02/1928');
    expect(screen.getByTestId(/summary-country/)).toHaveTextContent(
      'United Kingdom',
    );

    expect(screen.getByTestId(/summary-nationality/)).toHaveTextContent(
      'British',
    );

    expect(screen.getByTestId(/summary-marital-status/)).toHaveTextContent(
      'Married',
    );

    expect(screen.getByTestId(/summary-dependants/)).toHaveTextContent('None');
    expect(screen.getByTestId(/summary-adults/)).toHaveTextContent('2');
  });

  it('should render addresses correctly and in chronological order', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('Address History');

    // ASSERT
    expect(screen.getByTestId('summary-address[0]')).toHaveTextContent(
      'Tower of London, Westminster, London, SW1A 1AA',
    );

    expect(screen.getByTestId('summary-address[0].status')).toHaveTextContent(
      'Owned',
    );

    expect(screen.getByTestId('summary-address[0].moved-in')).toHaveTextContent(
      '01/11/2012',
    );

    expect(screen.getByTestId('summary-address[1]')).toHaveTextContent(
      'Buckingham Palace, Westminster, London, SW1A 1AA',
    );

    expect(screen.getByTestId('summary-address[1].status')).toHaveTextContent(
      'Rented',
    );

    expect(screen.getByTestId('summary-address[1].moved-in')).toHaveTextContent(
      '01/11/2009',
    );
  });

  it('should render employments correctly and in chronological order', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('Employment History');

    // ASSERT
    expect(
      screen.getByTestId('summary-employment[0].status'),
    ).toHaveTextContent('Retired');

    expect(screen.getByTestId('summary-employment[0].since')).toHaveTextContent(
      '01/01/2015',
    );

    expect(
      screen.getByTestId('summary-employment[1].status'),
    ).toHaveTextContent('Employed');

    expect(screen.getByTestId('summary-employment[1].title')).toHaveTextContent(
      'TV Presenter',
    );

    expect(
      screen.getByTestId('summary-employment[1].company'),
    ).toHaveTextContent('BBC Studios');

    expect(screen.getByTestId('summary-employment[1].phone')).toHaveTextContent(
      '02084332000',
    );

    expect(
      screen.getByTestId('summary-employment[1].address'),
    ).toHaveTextContent('1 Television Centre, 101 Wood Lane, London, W12 7FA');

    expect(
      screen.getByTestId('summary-employment[1].income'),
    ).toHaveTextContent('£600,000.00');

    expect(screen.getByTestId('summary-employment[1].since')).toHaveTextContent(
      '17/12/1950',
    );
  });

  it('should render monthly expenses correctly', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('Monthly Expenses');

    // ASSERT
    expect(
      screen.getByTestId('summary-average-monthly-income'),
    ).toHaveTextContent('£25,000.00');

    expect(screen.getByTestId('summary-total-expenses')).toHaveTextContent(
      '£14,567.11',
    );

    expect(screen.getByTestId('summary-net-disposable')).toHaveTextContent(
      '£10,000.00',
    );
  });

  it('should render bank details correctly', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByText('Bank Details');

    // ASSERT
    expect(screen.getByTestId('summary-bank-name')).toHaveTextContent(
      'Bank of Merica!',
    );

    expect(screen.getByTestId('summary-name-on-card')).toHaveTextContent(
      "Mr Brucey 'Bonus' Forsyth",
    );

    expect(screen.getByTestId('summary-sort-code')).toHaveTextContent(
      '00-11-22',
    );

    expect(screen.getByTestId('summary-account-number')).toHaveTextContent(
      '12345678',
    );
  });

  it.skip('should redirect to the thank you page when clicking "Continue"', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByText(/Continue/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/olaf/thank-you', '/olaf/thank-you');
  });

  it('should redirect to about page when clicking "Edit" on the "Your Details" section', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-your-details/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/about?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
      '/olaf/about?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
    );
  });

  it('should redirect to employment history page when clicking "Edit" on the "Employment History" section', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-employment-history/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/employment-history?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
      '/olaf/employment-history?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
    );
  });

  it('should redirect to expenses page when clicking "Edit" on the "Monthly Income" section', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-expenses/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/expenses?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
      '/olaf/expenses?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
    );
  });

  it('should redirect to bank details page when clicking "Edit" on the "Bank Details" section', async () => {
    // ARRANGE
    const uuid = 'fd2333b8-6da1-47d2-837d-bc69849e0764';
    const mocks = [createBruceData(uuid)];

    // ACT
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <SummaryFormContainer personUuid={uuid} orderId={ORDER_ID} />
      </MockedProvider>,
    );

    // Wait for the data to load
    await screen.findByTestId('summary-heading');

    fireEvent.click(screen.getByTestId(/edit-bank-details/));

    // ASSERT
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(
      '/olaf/bank-details?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
      '/olaf/bank-details?uuid=fd2333b8-6da1-47d2-837d-bc69849e0764&redirect=summary',
    );
  });
});
