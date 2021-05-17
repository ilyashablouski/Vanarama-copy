import { calculateDisposableIncome } from '../utils';

describe('calculateDisposableIncome', () => {
  it('with existingVehicle to be negative', () => {
    const data = {
      annualTurnover: '50000',
      existingVehicle: true,
      annualCostOfSales: '25000',
      annualExpenses: '40000',
      monthlyAmountBeingReplaced: '100',
    };

    const disposableIncome = calculateDisposableIncome(data);

    expect(disposableIncome).toBe(-13800);
  });

  it('with existingVehicle to be positive', () => {
    const data = {
      annualTurnover: '50000',
      existingVehicle: true,
      annualCostOfSales: '25000',
      annualExpenses: '20000',
      monthlyAmountBeingReplaced: '250',
    };

    const disposableIncome = calculateDisposableIncome(data);

    expect(disposableIncome).toBe(8000);
  });

  it('without existingVehicle to be positive', () => {
    const data = {
      annualTurnover: '20000',
      annualCostOfSales: '15000',
      annualExpenses: '4500',
      existingVehicle: false,
      monthlyAmountBeingReplaced: '',
    };

    const disposableIncome = calculateDisposableIncome(data);

    expect(disposableIncome).toBe(500);
  });

  it('without existingVehicle to be negative', () => {
    const data = {
      annualTurnover: '20000',
      annualCostOfSales: '15000',
      annualExpenses: '5500',
      existingVehicle: false,
      monthlyAmountBeingReplaced: '',
    };

    const disposableIncome = calculateDisposableIncome(data);

    expect(disposableIncome).toBe(-500);
  });
});
