import { calculateIncome } from '../utils';

describe('calculateIncome', () => {
  it('should have correct calculated values', () => {
    const input = {
      averageMonthlyIncome: '15000',
      carFinance: '200',
      creditCardPayments: '350',
      foodAndClothes: '1234',
      fuel: '123',
      insurance: '1300',
      mortgageOrRent: '4500',
      otherCredit: '6200',
      phoneAndInternet: '120',
      studentLoans: '320',
      utilities: '400',
    };

    const expected = {
      disposableIncome: 253,
      monthlyExpenses: 14747,
    };

    const calculated = calculateIncome(input);
    expect(calculated).toEqual(expected);
  });
});
