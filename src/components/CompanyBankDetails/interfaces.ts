import { SortCodeValue } from '@vanarama/uibook/lib/components/molecules/sortcode/interfaces';
import { UpdateBankDetailsMutation_updateLimitedCompany_bankAccounts } from '../../../generated/UpdateBankDetailsMutation';
import { CompanyBankDetailsAccount } from '../../../generated/CompanyBankDetailsAccount';
import { GetCompanyBankDetailsPageDataQuery, GetCompanyBankDetailsPageDataQueryVariables, GetCompanyBankDetailsPageDataQuery_companyByUuid_bankAccounts } from '../../../generated/GetCompanyBankDetailsPageDataQuery';

export interface ICompanyBankDetails {
  accountName?: string;
  accountNumber?: string;
  sortCode?: SortCodeValue;
  joinedAtMonth?: string;
  joinedAtYear?: string;
}

export interface ICompanyBankDetailsProps {
  onSubmit: (values: ICompanyBankDetails) => Promise<any>;
  account?: CompanyBankDetailsAccount |GetCompanyBankDetailsPageDataQuery_companyByUuid_bankAccounts;
  data?: ICompanyBankDetails;
}
