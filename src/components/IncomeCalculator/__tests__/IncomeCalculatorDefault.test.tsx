import * as React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import IncomeCalculator from '../IncomeCalculator';
import { inputChange } from './utils';

const getComponent = () => {
  return render(<IncomeCalculator expenditure={null} onSubmit={jest.fn()} />);
};

describe('<IncomeCalculator />', () => {
  const value = '200';
  const wrapper = mount(
    <IncomeCalculator expenditure={null} onSubmit={jest.fn()} />,
  );

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('calculates average monthly income correctly', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), value);

    const input = getByLabelText('Average Monthly Income');
    expect(input.getAttribute('value')).toEqual(value);
  });

  it('calculates total monthly expenses correctly', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), value);

    const input = getByLabelText('Total Monthly Expenses');
    expect(input.getAttribute('value')).toEqual('0');
  });

  it('calculates disposable income correctly', () => {
    const { getByLabelText } = getComponent();

    inputChange(getByLabelText('Average Monthly Income'), value);

    const input = getByLabelText('Net Disposable Income');
    expect(input.getAttribute('value')).toEqual(value);
  });
});
