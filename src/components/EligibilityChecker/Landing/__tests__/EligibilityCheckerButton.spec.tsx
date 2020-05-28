import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EligibilityCheckerButton from '../EligibilityCheckerButton';

const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

describe('<EligibilityCheckerButton />', () => {
  it('renders correctly', () => {
    render(<EligibilityCheckerButton />);
    fireEvent.click(screen.getByTestId(/eligibility-Checker-btn/));

    expect(mockPush).toHaveBeenCalledWith('/eligibility-checker/details');
  });
});
