import moment from 'moment';
import { ICompanyBankDetails } from '../../components/CompanyBankDetails/interfaces';
import { LimitedCompanyInputObject } from '../../../generated/globalTypes';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';

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

export const mapDefaultValues = (data?: CreditApplication | null) => {
  const account = data?.bankAccounts?.[0];

  return {
    accountName: account?.account_name,
    accountNumber: account?.account_number,
    joinedAtMonth: account?.joined_at_month,
    joinedAtYear: account?.joined_at_year,
    sortCode: account?.sort_code,
  };
};
