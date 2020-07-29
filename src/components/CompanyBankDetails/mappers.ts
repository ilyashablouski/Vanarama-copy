import { ICompanyBankDetails } from './interfaces';
import { CompanyBankDetailsAccount } from '../../../generated/CompanyBankDetailsAccount';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  account?: CompanyBankDetailsAccount,
): ICompanyBankDetails => {
  const joinedDate = account?.joinedAt ? new Date(account.joinedAt) : undefined;
  return {
    uuid: account?.uuid,
    accountNumber: account?.accountNumber || '',
    uuid: account?.uuid,
    accountName: account?.accountName || '',
    joinedAtMonth: joinedDate ? String(joinedDate.getMonth() + 1) : '',
    joinedAtYear: joinedDate ? String(joinedDate.getFullYear()) : '',
    sortCode: account?.sortCode
      ? [
          account.sortCode.slice(0, 2),
          account.sortCode.slice(2, 4),
          account.sortCode.slice(4, 6),
        ]
      : ['', '', ''],
  };
};
