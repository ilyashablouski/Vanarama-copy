import React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SoleTraderCompanyDetailsForm from '../SoleTraderCompanyDetailsForm';
import { ISoleTraderCompanyDetailsFormValues } from '../interfaces';
import { makeSicCodesMock } from '../../../containers/CompanyDetailsFormContainer/gql';
import { makeAddressResponseMock } from '../../../hooks/useLoqate/utils';
import useLoqate from '../../../hooks/useLoqate';

jest.mock('../../../hooks/useLoqate');
(useLoqate as jest.Mock).mockReturnValue(makeAddressResponseMock());

let getSicCodesCalled = false;

const sicDataMocks = [
  makeSicCodesMock(() => {
    getSicCodesCalled = true;
  }),
];

function typeIntoAddressField(value: string) {
  const input = screen.getByTestId(
    'sole-trader-company-details_trading-address',
  );
  fireEvent.focus(input);
  fireEvent.change(input, { target: { value } });
}

function typeIntoNatureField(value: string) {
  const field = screen.getByTestId('company-details_nature');
  fireEvent.focus(field);
  fireEvent.change(field, { target: { value } });
}

describe('<SoleTraderCompanyDetailsForm />', () => {
  beforeEach(async () => {
    await preloadAll();
  });

  const onSubmitMock = jest.fn<void, [ISoleTraderCompanyDetailsFormValues]>();
  const handleNatureMock = jest.fn();

  beforeEach(() => {
    onSubmitMock.mockReset();
    render(
      <MockedProvider addTypename={false} mocks={sicDataMocks}>
        <SoleTraderCompanyDetailsForm
          natureOfBusiness={['orange man']}
          setNatureOfBusiness={handleNatureMock}
          companyDetails={
            {
              monthlyAmountBeingReplaced: '',
            } as ISoleTraderCompanyDetailsFormValues
          }
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

    typeIntoAddressField('GB|001');
    fireEvent.mouseDown(screen.getByText(/^B001, Purbeck House 5-7/));

    typeIntoNatureField('62020');
    await waitFor(() => expect(getSicCodesCalled).toBeTruthy());
    fireEvent.click(screen.getByText(/^62020/));

    fireEvent.change(
      screen.getByTestId('company-details_trading-since-month'),
      {
        target: { value: '1' },
      },
    );
    fireEvent.change(
      screen.getByTestId('sole-trader-company-details_trading-since-year'),
      {
        target: { value: '1990' },
      },
    );
    fireEvent.input(
      screen.getByTestId(
        'sole-trader-company-details_business-telephone-number',
      ),
      {
        target: { value: '07777777777' },
      },
    );
    fireEvent.input(screen.getByTestId('sole-trader-company-details_email'), {
      target: { value: 'some@email.com' },
    });
    fireEvent.input(
      screen.getByTestId('sole-trader-company-details_annual-turnover'),
      {
        target: { value: '12345' },
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
