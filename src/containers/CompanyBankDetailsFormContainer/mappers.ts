import moment from 'moment';
import { ICompanyBankDetails } from '../../components/CompanyBankDetails/interfaces';
import { LimitedCompanyInputObject } from '../../../generated/globalTypes';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { UpdateLimitedBankDetailsMutation_createUpdateLimitedCompany_bankAccounts as BankAccount } from '../../../generated/UpdateLimitedBankDetailsMutation';

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
      bankName: values.bankName || null,
      accountName: values.accountName || null,
      accountNumber: values.accountNumber || null,
      sortCode: values.sortCode?.join('') || null,
      joinedAt: joiningDateFormatted,
    },
  };
};

export const mapBankAccountsForCreditApplication = (
  values: ICompanyBankDetails,
  bankAccounts?: BankAccount[] | null,
) => {
  const currentBankAccount = bankAccounts?.find(
    account => account.accountName === values.accountName,
  );
  const formattedBankAccount = {
    uuid: currentBankAccount?.uuid,
    bankName: values.bankName,
    accountName: values.accountName,
    accountNumber: values.accountNumber,
    joinedAtMonth: values?.joinedAtMonth,
    joinedAtYear: values?.joinedAtYear,
    sortCode: values?.sortCode?.join(''),
  };

  return [formattedBankAccount];
};

export const mapDefaultValues = (data?: CreditApplication | null) => {
  const account = data?.bankAccounts?.[0];

  return {
    uuid: account?.uuid,
    bankName: account?.bank_name,
    accountName: account?.account_name,
    accountNumber: account?.account_number,
    joinedAtMonth: account?.joined_at_month,
    joinedAtYear: account?.joined_at_year,
    sortCode: account?.sort_code?.match(/.{1,2}/g),
  };
};
