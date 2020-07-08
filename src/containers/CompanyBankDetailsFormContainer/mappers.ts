import moment from 'moment';
import { ICompanyBankDetails } from 'components/CompanyBankDetails/interfaces';
import {
  UpdateBankDetailsMutation_updateLimitedCompany,
} from '../../../generated/UpdateBankDetailsMutation';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  uuid: string,
  values: ICompanyBankDetails,
): UpdateBankDetailsMutation_updateLimitedCompany => {
  const joiningDate = `${values.joinedAtMonth}-${values.joinedAtYear}`;
  const joiningDateFormatted = moment(joiningDate, 'MM-YYYY').format(
    'YYYY-MM-DD',
  );

  return {
    uuid,
    bankAccounts: [
      {
        accountName: values.accountName || null,
        accountNumber: values.accountNumber ? values.accountNumber : null,
        sortCode: values.sortCode?.join('') || null,
        joinedAt: joiningDateFormatted,
      },
    ],
  };
};
