import React from 'react';
import cx from 'classnames';

import Icon from 'core/atoms/icon';
import Text from 'core/atoms/text/Text';
import Loading from 'core/atoms/loading';
import CheckmarkCircleOutline from 'core/assets/icons/CheckmarkCircleSharp';

import { IBankAccountStatusProps } from './interface';

function BankAccountStatus({
  isLoading,
  isValid,
  className,
}: IBankAccountStatusProps) {
  const resultClassName = cx('bank-account-status', className);

  if (isLoading) {
    return (
      <div className={resultClassName}>
        <Loading className="loader" />
        <Text color="darker" size="lead">
          We’re just verifying your bank details.
        </Text>
      </div>
    );
  }
  if (isValid === true) {
    return (
      <div className={resultClassName}>
        <Icon
          icon={<CheckmarkCircleOutline />}
          color="success"
          className="checkmark"
        />
        <Text color="success" size="lead">
          Bank details successfully verified with Barclays.
        </Text>
      </div>
    );
  }
  if (isValid === false) {
    return (
      <div className={resultClassName}>
        <Text color="danger" size="lead">
          Your bank details could not be verified.
          <br />
          Please check these and try again.
        </Text>
      </div>
    );
  }

  return null;
}

export default BankAccountStatus;
