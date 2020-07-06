import { SortCodeValue } from '@vanarama/uibook/lib/components/molecules/sortcode/interfaces';
import { BankDetailsAccount } from '../../../generated/BankDetailsAccount';

export interface ICompanyBankDetails {
  nameOnTheAccount?: string;
  accountNumber?: string;
  sortCode?: SortCodeValue;
  bankName?: string;
  openingMonth?: string;
  openingYear?: string;
  understand?: boolean;
  affordRental?: boolean;
  checkCreditHistory?: boolean;
  termsAndConditions?: boolean;
}

export interface ICompanyBankDetailsProps {
  account?: BankDetailsAccount;
  data?: ICompanyBankDetails;
  onSubmit: (values: ICompanyBankDetails) => Promise<any>;
}
