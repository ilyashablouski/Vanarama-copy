import { ICompanyBankDetails } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  account?: ICompanyBankDetails,
): ICompanyBankDetails => {

  return {
    uuid: account?.uuid,
    accountNumber: account?.accountNumber || '',
    accountName: account?.accountName || '',
    joinedAtMonth: account?.joinedAtMonth || '',
    joinedAtYear: account?.joinedAtYear || '',
    sortCode: account?.sortCode || ['', '', ''],
  };
};
