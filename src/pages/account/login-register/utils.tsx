import * as React from 'react';
import Heading from '@vanarama/uibook/packages/ui-components/src/css/atoms/Heading';

const message = (className: string, message: string) => (
  <div style={{ paddingTop: '16px', paddingBottom: '16px' }}>
    <Heading id="register-status-message" color={className}>
      {message}
    </Heading>
  </div>
);

export const registerStatusMessage = (
  successMessage: string,
  errorMessage: string,
) => {
  if (successMessage != null) {
    return message('success', successMessage);
  }

  if (errorMessage != null) {
    return message('orange', errorMessage);
  }

  return null;
};
