import React from 'react';
import { render, screen } from '@testing-library/react';
import CreditChecker from '../../pages/eligibility-checker/credit-checker';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: mockPush,
      query: {
        score: 75,
      },
    };
  },
}));

describe('<CreditChecker />', () => {
  it('should render title, link and text correctly', () => {
    // ACT
    render(<CreditChecker />);

    expect(screen.getByText('Not sure? We can')).toBeInTheDocument();
    expect(screen.getByText('help you choose')).toBeInTheDocument();
  });

  it('should render showing Credit Checker', () => {
    // ACT
    render(<CreditChecker />);

    // ASSERT
    expect(screen.getByText('Choose Your Vehicle'));
  });
});
