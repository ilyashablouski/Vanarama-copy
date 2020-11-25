import React from 'react';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import SoleTraderCompanyDetailsForm from '../SoleTraderCompanyDetailsForm';
import { ISoleTraderCompanyDetailsFormValues } from '../interfaces';

describe('<SoleTraderCompanyDetailsForm />', () => {
  const onSubmitMock = jest.fn<void, [ISoleTraderCompanyDetailsFormValues]>();

  beforeEach(() => {
    onSubmitMock.mockReset();
    render(
      <SoleTraderCompanyDetailsForm
        natureOfBusiness={['']}
        setNatureOfBusiness={jest.fn()}
        companyDetails={{ monthlyAmountBeingReplaced: '' }}
        onSubmit={onSubmitMock}
      />,
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
    fireEvent.input(
      screen.getByTestId('sole-trader-company-details_nature-of-business'),
      {
        target: { value: 'test nature of business' },
      },
    );
    fireEvent.input(screen.getByTestId('company-details_nature'), {
      target: { value: 'test nature of business' },
    });
    fireEvent.change(
      screen.getByTestId('sole-trader-company-details_trading-address'),
      {
        target: {
          value: '000',
        },
      },
    );
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
