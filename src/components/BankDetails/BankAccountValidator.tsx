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

function BankAccountValidator({ sortCode, accountNumber }: IProps) {
  const isSortCodeValid = sortCode?.length === 6;
  const isAccountNumberValid = accountNumber?.length === 8;

  const [
    validateBankAccount,
    { data, loading, error },
  ] = useBankAccountValidator();

  useEffect(() => {
    if (!isAccountNumberValid || !isSortCodeValid) return;

    validateBankAccount({
      variables: { sortCode, accountNumber },
    });
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
