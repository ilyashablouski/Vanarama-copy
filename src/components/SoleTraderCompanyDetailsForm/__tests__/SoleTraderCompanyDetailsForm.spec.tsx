import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import SoleTraderCompanyDetailsForm from '../SoleTraderCompanyDetailsForm';
import { ISoleTraderCompanyDetailsFormValues } from '../interfaces';
import { GET_SIC_CODES } from '../../../containers/CompanyDetailsFormContainer/gql';

describe('<SoleTraderCompanyDetailsForm />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  const onSubmitMock = jest.fn<void, [ISoleTraderCompanyDetailsFormValues]>();
  const handleNatureMock = jest.fn();

  const sicData: MockedResponse[] = [
    {
      request: {
        query: GET_SIC_CODES,
      },
      result: {
        data: {
          sicCodes: {
            sicData: [
              {
                sicCode: '',
                description: '',
              },
            ],
          },
        },
      },
    },
  ];

  beforeEach(() => {
    onSubmitMock.mockReset();
    render(
      <MockedProvider addTypename={false} mocks={sicData}>
        <SoleTraderCompanyDetailsForm
          natureOfBusiness={['orange man']}
          setNatureOfBusiness={handleNatureMock}
          companyDetails={{ monthlyAmountBeingReplaced: '' }}
          onSubmit={onSubmitMock}
        />
      </MockedProvider>,
    );
  });

  it('should show required form field validation messages', async () => {
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByTestId('company-details_heading')).toBeVisible(),
    );

    expect(screen.getByText('Please enter trading name')).toBeVisible();
    expect(
      screen.getByText('Please enter the registered business address'),
    ).toBeVisible();
    expect(
      screen.getByText('Please enter the trading since date'),
    ).toBeVisible();
    expect(screen.getByText('Please enter your phone number')).toBeVisible();
    expect(screen.getByText('Please enter your email address')).toBeVisible();
    expect(screen.getByText('Please enter annual turnover')).toBeVisible();
    expect(screen.getByText('Please enter annual cost of sales')).toBeVisible();
    expect(screen.getByText('Please enter annual expenses')).toBeVisible();
  });

  it('should show additional fields validation messages', async () => {
    fireEvent.click(
      screen.getByTestId('sole-trader-company-details_existing-vehicle'),
    );
    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByTestId('company-details_heading')).toBeVisible(),
    );

    expect(
      screen.getByText('Please enter vehicle registration number'),
    ).toBeVisible();
    expect(
      screen.getByText('Please fill in monthly amount being replaced'),
    ).toBeVisible();
  });

  it('should correctly submit form', async () => {
    fireEvent.click(
      screen.getByTestId('sole-trader-company-details_existing-vehicle'),
    );

    fireEvent.input(
      screen.getByTestId('sole-trader-company-details_trading-name'),
      {
        target: { value: 'test trading name' },
      },
    );
    fireEvent.change(
      screen.getByTestId('sole-trader-company-details_trading-address'),
      {
        target: {
          value: '000',
        },
      },
    );
    fireEvent.input(screen.getByTestId('company-details_nature'), {
      target: { value: 'test nature of business' },
    });
    fireEvent.input(screen.getByTestId('company-details_trading-since-month'), {
      target: { value: new Date().getMonth() },
    });
    fireEvent.input(
      screen.getByTestId('sole-trader-company-details_trading-since-year'),
      {
        target: { value: new Date().getFullYear().toString() },
      },
    );
    fireEvent.input(
      screen.getByTestId(
        'sole-trader-company-details_business-telephone-number',
      ),
      {
        target: { value: '0123123123123' },
      },
    );
    fireEvent.input(screen.getByTestId('sole-trader-company-details_email'), {
      target: { value: 'some@email.com' },
    });
    fireEvent.input(
      screen.getByTestId('sole-trader-company-details_annual-turnover'),
      {
        target: { value: '123' },
      },
    );
    fireEvent.input(
      screen.getByTestId('sole-trader-company-details_annual-cost-of-sales'),
      {
        target: { value: '123' },
      },
    );
    fireEvent.input(
      screen.getByTestId('sole-trader-company-details_annual-expenses'),
      {
        target: { value: '123' },
      },
    );
    fireEvent.input(
      screen.getByTestId(
        'sole-trader-company-details_vehicle-egistration-number',
      ),
      {
        target: { value: 'ab1233' },
      },
    );
    fireEvent.input(
      screen.getByTestId(
        'sole-trader-company-details_monthly-amount-being-replaced',
      ),
      {
        target: { value: '123' },
      },
    );

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(screen.getByTestId('company-details_heading')).toBeVisible(),
    );

    expect(onSubmitMock).toHaveBeenCalled();
  });
});
