/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/prefer-screen-queries */
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import RouterLink from '../RouterLink';
import { LinkTypes } from '../../../models/enum/LinkTypes';

describe('<RouterLink />', () => {
  const resetMocks = () => {
    return {
      link: {
        label: 'Login',
        href: '/account/login-register',
      },
      replace: false,
      onClick: null,
      className: '',
      classNames: null,
    } as any;
  };

  let mocks = resetMocks();

  beforeEach(() => {
    mocks = resetMocks();
  });

  it('should make render router-link', () => {
    // ARRANGE

    // ACT
    const { queryByTestId } = render(<RouterLink {...mocks} />);

    // ASSERT

    expect(queryByTestId('link')).toBeFalsy();
    expect(queryByTestId('router-link')).toBeTruthy();
  });

  it('should make render link', () => {
    // ARRANGE
    mocks.link.linkType = LinkTypes.external;

    // ACT
    const { queryByTestId } = render(<RouterLink {...mocks} />);

    // ASSERT
    expect(queryByTestId('link')).toBeTruthy();
    expect(queryByTestId('router-link')).toBeFalsy();
  });

  it('should call onClick from props when we have this and click link', () => {
    // ARRANGE
    mocks.link.linkType = LinkTypes.external;
    mocks.onClick = jest.fn();

    // ACT
    const { getByTestId } = render(<RouterLink {...mocks} />);

    // ASSERT
    fireEvent.click(getByTestId('link'));

    expect(mocks.onClick).toBeCalled();
  });
});
