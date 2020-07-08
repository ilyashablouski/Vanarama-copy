import { ICompanyBankDetails } from './interfaces';
import { UpdateBankDetailsMutation_updateLimitedCompany_bankAccounts } from '../../../generated/UpdateBankDetailsMutation';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  account?: UpdateBankDetailsMutation_updateLimitedCompany_bankAccounts,
): ICompanyBankDetails => {
  const joinedDate = account?.joinedAt ? new Date(account.joinedAt) : undefined;
  return {
    accountNumber: account?.accountNumber || '',
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
