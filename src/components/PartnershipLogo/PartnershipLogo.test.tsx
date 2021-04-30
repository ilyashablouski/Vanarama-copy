import preloadAll from 'jest-next-dynamic';
import React from 'react';
import { render, screen } from '@testing-library/react';
import PartnershipLogo from './PartnershipLogo';

describe('PartnershipLogo', () => {
  beforeEach(async () => {
    await preloadAll();
    render(
      <PartnershipLogo title="In partnership with" logo="https://via.placeholder.com/300x90.png"/>,
    );
  })
  test('Renders the title', async () => {
    expect(screen.getByText(/In partnership with/i)).toBeInTheDocument();
  });
  test('Renders the logo', async () => {
    expect(screen.getByTestId("partnership_hero-logo")).toBeInTheDocument();
  });
});