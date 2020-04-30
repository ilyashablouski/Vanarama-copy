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
  data?: IBankDetails;
  onSubmit: (values: IBankDetails) => Promise<void>;
}
