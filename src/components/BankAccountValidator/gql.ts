import { gql, useLazyQuery } from '@apollo/client';

import {
  BankAccountValidator as Query,
  BankAccountValidatorVariables as QueryVariables,
} from '../../../generated/BankAccountValidator';

export const BANK_ACCOUNT_VALIDATOR = gql`
  query BankAccountValidator($sortCode: String!, $accountNumber: String!) {
    bankAccountValidator(sortCode: $sortCode, accountNumber: $accountNumber) {
      bankName
      valid
    }
  }
`;

export function useBankAccountValidator() {
  return useLazyQuery<Query, QueryVariables>(BANK_ACCOUNT_VALIDATOR);
}

export function makeBankAccountValidatorMock() {
  return {
    request: {
      query: BANK_ACCOUNT_VALIDATOR,
      variables: {
        sortCode: '019387',
        accountNumber: '67272820',
      },
    },
    result: {
      data: {
        bankAccountValidator: {
          bankName: null,
          valid: false,
        },
      },
    },
  };
}
