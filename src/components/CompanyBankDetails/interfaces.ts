import { SortCodeValue } from '@vanarama/uibook/lib/components/molecules/sortcode/interfaces';

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
  account?: ICompanyBankDetails;
  data?: ICompanyBankDetails;
  isEdited: boolean;
}
