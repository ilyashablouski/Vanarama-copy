import { SortCodeValue } from '@vanarama/uibook/lib/components/molecules/sortcode/interfaces';
import { UpdateBankDetailsMutation_updateLimitedCompany_bankAccounts } from '../../../generated/UpdateBankDetailsMutation';

export interface ICompanyBankDetails {
  accountName?: string;
  accountNumber?: string;
  sortCode?: SortCodeValue;
  joinedAtMonth?: string;
  joinedAtYear?: string;
}

export interface ICompanyBankDetailsProps {
  onSubmit: (values: ICompanyBankDetails) => Promise<any>;
  account?: UpdateBankDetailsMutation_updateLimitedCompany_bankAccounts;
  data?: ICompanyBankDetails;
}
