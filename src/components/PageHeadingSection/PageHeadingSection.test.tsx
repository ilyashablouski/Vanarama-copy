import preloadAll from 'jest-next-dynamic';
import React from 'react';
import { render, screen } from '@testing-library/react';
import PageHeadingSection from '.';

describe('PageHeadingSection', () => {
  beforeEach(async () => {
    await preloadAll();
    render(
      <PageHeadingSection
        header="This is a header"
        description="and this is a description"
      />,
    );
  });
  test('Renders the title', async () => {
    expect(screen.getByText(/This is a header/i)).toBeInTheDocument();
  });
  test('Renders the description', async () => {
    expect(screen.getByText(/and this is a description/i)).toBeInTheDocument();
  });
});
