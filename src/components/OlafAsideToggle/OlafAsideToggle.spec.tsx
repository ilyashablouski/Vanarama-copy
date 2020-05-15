import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import OlafAsideToggle from './OlafAsideToggle';

describe('<OlafAsideToggle />', () => {
  it('renders correctly', async () => {
    render(
      <OlafAsideToggle>
        <div> test </div>
      </OlafAsideToggle>,
    );

    await waitFor(() => {
      expect(screen.queryByText('test')).not.toBeInTheDocument();
    });
  });

  it('renders correctly with toggle', async () => {
    render(
      <OlafAsideToggle>
        <div> test </div>
      </OlafAsideToggle>,
    );

    fireEvent.click(screen.getByTestId('olaf-aside-toggle'));

    await waitFor(() => {
      expect(screen.getByText('test'));
    });
  });
});