import * as React from 'react';
import preloadAll from 'jest-next-dynamic';
import { render, screen } from '@testing-library/react';
import IncomeCalculator from '../IncomeCalculator';
import { inputChange } from '../../../utils/testing';

const renderComponent = () => {
  render(<IncomeCalculator expenditure={null} onSubmit={jest.fn()} />);
};

describe('<IncomeCalculator />', () => {
  beforeEach(async () => {
    await preloadAll();
  });
  const value = '200';

  it('calculates average monthly income correctly', () => {
    renderComponent();

    inputChange(screen.getByLabelText('Average Monthly Income'), value);

    const input = screen.getByLabelText('Average Monthly Income');
    expect(input.getAttribute('value')).toEqual(value);
  });

  it('calculates total monthly expenses correctly', () => {
    renderComponent();

    inputChange(screen.getByLabelText('Average Monthly Income'), value);

    const input = screen.getByLabelText('Total Monthly Expenses');
    expect(input.getAttribute('value')).toEqual('0');
  });

  it('calculates disposable income correctly', () => {
    renderComponent();

    inputChange(screen.getByLabelText('Average Monthly Income'), value);

    const input = screen.getByLabelText('Net Disposable Income');
    expect(input.getAttribute('value')).toEqual(value);
  });
});
