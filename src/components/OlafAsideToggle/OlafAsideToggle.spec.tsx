import { fireEvent, render, screen } from '@testing-library/react';
import OlafAsideToggle from './OlafAsideToggle';

describe('<OlafAsideToggle />', () => {
  it('should not render children when initially mounted', async () => {
    // ACT
    render(<OlafAsideToggle>test</OlafAsideToggle>);

    // ASSERT
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
  });

  it('should render children when the user clicks the toggle button', async () => {
    // ACT
    render(<OlafAsideToggle>test</OlafAsideToggle>);

    fireEvent.click(screen.getByRole('button', { name: /view your order/i }));

    // ASSERT
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('should render children then hide them again when the user clicks the toggle button twice', async () => {
    // ACT
    render(<OlafAsideToggle>test</OlafAsideToggle>);
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /view your order/i }));
    expect(screen.getByText(/test/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /view your order/i }));

    // ASSERT
    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
  });
});
