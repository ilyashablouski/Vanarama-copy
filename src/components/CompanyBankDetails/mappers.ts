import { BankDetailsAccount } from '../../../generated/BankDetailsAccount';
import { IBankDetails } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  account?: BankDetailsAccount,
): IBankDetails => {
  const hasExistingAccount = Boolean(account);
  const joinedDate = account?.joinedAt ? new Date(account.joinedAt) : undefined;
  return {
    accountNumber: account?.accountNumber || '',
    affordRental: hasExistingAccount,
    bankName: account?.bankName || '',
    checkCreditHistory: hasExistingAccount,
    nameOnTheAccount: account?.accountName || '',
    openingMonth: joinedDate ? String(joinedDate.getMonth() + 1) : '',
    openingYear: joinedDate ? String(joinedDate.getFullYear()) : '',
    sortCode: account?.sortCode
      ? [
          account.sortCode.slice(0, 2),
          account.sortCode.slice(2, 4),
          account.sortCode.slice(4, 6),
        ]
      : ['', '', ''],
    termsAndConditions: hasExistingAccount,
    understand: hasExistingAccount,
  };
};
