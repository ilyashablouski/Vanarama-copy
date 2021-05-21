import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

import { useBankAccountValidator } from './gql';

const BankAccountStatus = dynamic(() =>
  import('core/organisms/bank-account-status'),
);

interface IProps {
  sortCode: string;
  accountNumber: string;
}

const VALID_SORT_CODE_LENGTH = 6;
const VALID_ACCOUNT_NUMBER_LENGTH = 8;

function BankAccountValidator({ sortCode, accountNumber }: IProps) {
  const isAccountNumberValid =
    accountNumber.length === VALID_ACCOUNT_NUMBER_LENGTH;
  const isSortCodeValid = sortCode.length === VALID_SORT_CODE_LENGTH;

  const [
    validateBankAccount,
    { data, loading, error },
  ] = useBankAccountValidator();

  useEffect(() => {
    if (isAccountNumberValid && isSortCodeValid) {
      validateBankAccount({
        variables: { sortCode, accountNumber },
      });
    }
  }, [
    isSortCodeValid,
    isAccountNumberValid,
    validateBankAccount,
    accountNumber,
    sortCode,
  ]);

  return (
    <BankAccountStatus
      isValid={data?.bankAccountValidator?.valid}
      isLoading={loading}
      isError={!!error}
    />
  );
}

export default BankAccountValidator;
