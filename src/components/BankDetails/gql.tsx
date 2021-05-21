import { gql, useLazyQuery } from '@apollo/client';

import {
  BankAccountValidator as Query,
  BankAccountValidatorVariables as QueryVariables,
} from '../../../generated/BankAccountValidator';

const BANK_ACCOUNT_VALIDATOR = gql`
  query BankAccountValidator($sortCode: String!, $accountNumber: String!) {
    bankAccountValidator(sortCode: $sortCode, accountNumber: $accountNumber) {
      valid
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export function useBankAccountValidator() {
  return useLazyQuery<Query, QueryVariables>(BANK_ACCOUNT_VALIDATOR);
}
