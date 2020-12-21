import React from 'react';
import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import Skeleton from '../Skeleton';

const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

export const WRONG_PASSWORD = 'WRONG_PASSWORD';

export const resetPasswordLink = {
  href: '/account/password-request',
  label: '',
};

export const wrongPasswordError = (
  <>
    {'Your old password seems incorrect. '}
    <RouterLink dataTestId="forgot-password" link={resetPasswordLink}>
      <Text tag="span" color="teal" size="small">
        Reset your password here
      </Text>
    </RouterLink>
  </>
);

export const mapOldPasswordErrorMessage = (message?: string) =>
  message !== WRONG_PASSWORD ? (
    message
  ) : (
    <Text color="danger" size="xsmall">
      {wrongPasswordError}
    </Text>
  );
