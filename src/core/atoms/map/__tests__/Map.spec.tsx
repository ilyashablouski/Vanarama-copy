import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Map from '../Map';

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: () => <div data-testid="google-map" />,
}));

describe('<Map />', () => {
  it('should load the Google Maps API script with the correct API key', async () => {
    // Use baseElement here because the script is attached to the document body
    const { baseElement } = render(<Map dataTestId="my-map" apiKey="MY_KEY" />);
    await waitFor(() =>
      expect(baseElement.querySelector('script')).toHaveAttribute(
        'src',
        'https://maps.googleapis.com/maps/api/js?key=MY_KEY',
      ),
    );
  });

  it('should render the map component once the script has loaded', async () => {
    const { container } = render(<Map apiKey="MY_KEY" />);
    await waitFor(() => screen.getByTestId('google-map'));
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="map"
        >
          <div
            class="map--container"
          />
          <div
            data-testid="google-map"
          />
        </div>
      </div>
    `);
  });
});
