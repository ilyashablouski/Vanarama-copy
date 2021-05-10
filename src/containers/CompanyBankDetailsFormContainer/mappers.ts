import { ICompanyBankDetails } from '../../components/CompanyBankDetails/interfaces';
import { LimitedCompanyInputObject } from '../../../generated/globalTypes';
import { GetCreditApplicationByOrderUuid_creditApplicationByOrderUuid as CreditApplication } from '../../../generated/GetCreditApplicationByOrderUuid';
import { UpdateLimitedBankDetailsMutation_createUpdateLimitedCompany_bankAccounts as BankAccount } from '../../../generated/UpdateLimitedBankDetailsMutation';
import { parseDate } from '../../utils/dates';

export const formValuesToInput = (
  uuid: string,
  values: ICompanyBankDetails,
  accountUuid?: string,
  personUuid?: string,
): LimitedCompanyInputObject => ({
  uuid,
  person: {
    uuid: personUuid,
  },
  bankAccount: {
    uuid: accountUuid || null,
    bankName: values.bankName || null,
    accountName: values.accountName || null,
    accountNumber: values.accountNumber || null,
    sortCode: values.sortCode?.join('') || null,
    joinedAt: parseDate(
      '01',
      values.joinedAtMonth || '',
      values.joinedAtYear || '',
    ),
  },
});

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
  const account = data?.bankAccountsV2?.[0];

  return {
    uuid: account?.uuid,
    bankName: account?.bankName,
    accountName: account?.accountName,
    accountNumber: account?.accountNumber,
    joinedAtMonth: account?.joinedAtMonth,
    joinedAtYear: account?.joinedAtYear,
    sortCode: account?.sortCode?.match(/.{1,2}/g),
  };
};
