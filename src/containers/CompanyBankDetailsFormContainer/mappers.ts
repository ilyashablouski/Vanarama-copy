import moment from 'moment';
import { ICompanyBankDetails } from 'components/CompanyBankDetails/interfaces';
import { UpdateBankDetailsMutation_updateLimitedCompany } from '../../../generated/UpdateBankDetailsMutation';
import {
  BankAccountInputObject,
  LimitedCompanyInputObject,
} from '../../../generated/globalTypes';

export const formValuesToInput = (
  uuid: string,
  values: ICompanyBankDetails,
): LimitedCompanyInputObject => {
  const joiningDate = `${values.joinedAtMonth}-${values.joinedAtYear}`;
  const joiningDateFormatted = moment(joiningDate, 'MM-YYYY').format(
    'YYYY-MM-DD',
  );

  return {
    uuid,
    bankAccount: {
      accountName: values.accountName || null,
      accountNumber: values.accountNumber || null,
      sortCode: values.sortCode?.join('') || null,
      joinedAt: joiningDateFormatted,
    },
  };
};
