import { SortCodeValue } from '@vanarama/uibook/lib/components/molecules/sortcode/interfaces';
import { CompanyBankDetailsAccount } from '../../../generated/CompanyBankDetailsAccount';

export interface ICompanyBankDetails {
  uuid?: string;
  accountName?: string;
  accountNumber?: string;
  sortCode?: SortCodeValue;
  joinedAtMonth?: string;
  joinedAtYear?: string;
}

export interface ICompanyBankDetailsProps {
  onSubmit: (values: ICompanyBankDetails) => Promise<any>;
  account?: CompanyBankDetailsAccount;
  data?: ICompanyBankDetails;
}
