import preloadAll from 'jest-next-dynamic';
import React from 'react';
import { render, screen } from '@testing-library/react';
import PartnershipLogo from '../PartnershipLogo/PartnershipLogo';

describe('PartnershipLogo', () => {
  beforeEach(async () => {
    await preloadAll();

    render(
      <PartnershipLogo
        title="In partnership with"
        logo={{
          url: 'https://via.placeholder.com/300x90.png',
          details: {
            image: {
              width: 100,
              height: 100,
            },
          },
        }}
      />,
    );
  });

  test('Renders the title', async () => {
    expect(screen.getByText(/In partnership with/i)).toBeInTheDocument();
  });

  test('Renders the logo', async () => {
    expect(screen.getByTestId('partnership_hero-logo')).toBeInTheDocument();
  });
});
