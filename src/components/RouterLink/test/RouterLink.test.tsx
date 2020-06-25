import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { LinkTypes } from '../../../models/enum/LinkTypes';
import RouterLink from '../RouterLink';

describe('<RouterLink />', () => {
  // eslint-disable-next-line no-console
  const originalError = console.error;
  beforeAll(() => {
    // This is here to silence as navigation is not supported by JSDOM
    jest.spyOn(console, 'error').mockImplementation((...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Not implemented: navigation (except hash changes)')
      ) {
        return undefined;
      }

      return originalError.call(console, args);
    });
  });

  it('should use the Next.js router by default', () => {
    // ACT
    render(
      <RouterLink link={{ label: 'Login', href: '/account/login-register' }} />,
    );

    // ASSERT
    expect(screen.getByTestId('router-link')).toBeInTheDocument();
    expect(screen.queryByTestId('link')).not.toBeInTheDocument();
  });

  it('should not use the Next.js router for external links', () => {
    // ACT
    render(
      <RouterLink
        link={{
          href: 'https://www.google.com',
          label: 'Google',
          linkType: LinkTypes.external,
        }}
      />,
    );

    // ASSERT
    expect(screen.getByTestId('link')).toBeInTheDocument();
    expect(screen.queryByTestId('router-link')).not.toBeInTheDocument();
  });

  it('should call `onClick` when clicking the link', () => {
    // ARRANGE
    const onClick = jest.fn();

    // ACT
    render(
      <RouterLink
        link={{
          href: '/account/login-register',
          label: 'Login',
          linkType: LinkTypes.external,
        }}
        onClick={onClick}
      />,
    );

    fireEvent.click(screen.getByRole('link'));

    // ASSERT
    expect(onClick).toBeCalled();
  });
});
