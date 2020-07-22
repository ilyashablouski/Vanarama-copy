import moment from 'moment';
import { ICompanyBankDetails } from '../../components/CompanyBankDetails/interfaces';
import { LimitedCompanyInputObject } from '../../../generated/globalTypes';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  uuid: string,
  values: ICompanyBankDetails,
  accountUuid?: string,
): LimitedCompanyInputObject => {
  const joiningDate = `${values.joinedAtMonth}-${values.joinedAtYear}`;
  const joiningDateFormatted = moment(joiningDate, 'MM-YYYY').format(
    'YYYY-MM-DD',
  );

  return {
    uuid,
    bankAccount: {
      uuid: accountUuid || null,
      accountName: values.accountName || null,
      accountNumber: values.accountNumber || null,
      sortCode: values.sortCode?.join('') || null,
      joinedAt: joiningDateFormatted,
    },
  };
};
