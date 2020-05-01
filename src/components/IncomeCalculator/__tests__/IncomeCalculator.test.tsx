import * as React from 'react';
import { render } from '@testing-library/react';
import IncomeCalculator from '../IncomeCalculator';
import { inputChange } from './utils';

const getComponent = () => {
  return render(<IncomeCalculator expenditure={null} onSubmit={jest.fn()} />);
};

describe('<IncomeCalculator Calculations />', () => {
  const averageMonthlyIncome = '200';
  const expense = '20';
  const totalMonthlyExpenses = '180';

  it('calculates total monthly expenses and disposable income correctly with [MortgageOrRent]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Mortgage or Rent'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [PhoneAndInternet]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Phone and Internet'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [CreditCardPayments]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Credit Card Payments'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [Utilities]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Utilities'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [Insurance]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Insurance'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [CarFinance]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Car Finance'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [FoodAndClothes]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Food and Clothes'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [Fuel]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Fuel'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [StudentLoan]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Student Loan'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });

  it('calculates total monthly expenses and disposable income correctly with [OtherCredit]', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), averageMonthlyIncome);
    inputChange(getByLabelText('Other Credit'), expense);

    const totalMonthlyExpensesInput = getByLabelText('Total Monthly Expenses');
    const netDisposableIncomeInput = getByLabelText('Net Disposable Income');

    expect(totalMonthlyExpensesInput.getAttribute('value')).toEqual(expense);
    expect(netDisposableIncomeInput.getAttribute('value')).toEqual(
      totalMonthlyExpenses,
    );
  });
});
