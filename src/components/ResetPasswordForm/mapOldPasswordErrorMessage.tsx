import React from 'react';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import RouterLink from '../RouterLink/RouterLink';

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
