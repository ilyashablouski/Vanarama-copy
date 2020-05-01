import { BankDetailsAccount } from '../../../generated/BankDetailsAccount';

export interface IBankDetails {
  nameOnTheAccount?: string;
  accountNumber?: string;
  sortCode?: string[];
  bankName?: string;
  openingMonth?: string;
  openingYear?: string;
  understand?: boolean;
  affordRental?: boolean;
  checkCreditHistory?: boolean;
  termsAndConditions?: boolean;
}

export interface IBankDetailsProps {
  account?: BankDetailsAccount;
  data?: IBankDetails;
  onSubmit: (values: IBankDetails) => Promise<any>;
}
