import React from 'react';
import { render, screen } from '@testing-library/react';
import CreditChecker from '../../pages/credit-checker';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: mockPush,
    };
  },
}));

describe('<CreditChecker />', () => {
  it('should render title, link and text correctly', () => {
    // ACT
    render(<CreditChecker />);

    expect(screen.getByText('Your Result')).toBeInTheDocument();
    expect(screen.getByText('Not sure? We can')).toBeInTheDocument();
    expect(screen.getByText('help you choose')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod odio blanditiis amet reiciendis cupiditate voluptas dolorum? Quidem nam ad debitis!',
      ),
    ).toBeInTheDocument();
  });

  it('should render showing Credit Checker', () => {
    // ACT
    render(<CreditChecker />);

    // ASSERT
    expect(screen.getByRole('button'));
  });
});
