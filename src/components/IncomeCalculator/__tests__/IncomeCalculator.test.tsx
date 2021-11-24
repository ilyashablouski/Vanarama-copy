import * as React from 'react';
import preloadAll from 'jest-next-dynamic';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import IncomeCalculator from '../IncomeCalculator';
import { inputChange } from '../../../utils/testing';
import { IOrderStorageData } from '../../../hooks/useGetOrder';

const mockOrder = {
  lineItems: [
    {
      vehicleProduct: {
        monthlyPayment: 200,
      },
    },
  ],
} as IOrderStorageData;

const isSubmit = false;

const renderComponent = () => {
  render(
    <IncomeCalculator
      expenditure={null}
      onSubmit={jest.fn()}
      isSubmit={isSubmit}
      order={mockOrder}
    />,
  );
};

describe('<IncomeCalculator Calculations />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  const averageMonthlyIncome = '200';
  const expense = '20';
  const totalMonthlyExpenses = '180';

  it('calculates total monthly expenses and disposable income correctly with [MortgageOrRent]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Mortgage or Rent'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [PhoneAndInternet]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Phone and Internet'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [CreditCardPayments]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Credit Card Payments'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [Utilities]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Utilities'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [Insurance]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Insurance'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [CarFinance]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Car Finance'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [FoodAndClothes]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Food and Clothes'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [Fuel]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Fuel'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [StudentLoan]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Student Loan'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [OtherCredit]', () => {
    renderComponent();

    inputChange(
      screen.getByLabelText('Average Monthly Income'),
      averageMonthlyIncome,
    );
    inputChange(screen.getByLabelText('Other Credit'), expense);

    const totalMonthlyExpensesInput = screen.getByLabelText(
      'Total Monthly Expenses',
    );
    const netDisposableIncomeInput = screen.getByLabelText(
      'Net Disposable Income',
    );

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('should show the correct validation messages', async () => {
    renderComponent();

    fireEvent.click(screen.getByText('Continue'));

    // ASSERT
    await waitFor(() =>
      expect(
        screen.getByText('You must accept to proceed'),
      ).toBeInTheDocument(),
    );

    await waitFor(() =>
      expect(
        screen.getByText('Please enter your monthly income'),
      ).toBeInTheDocument(),
    );
  });
});
