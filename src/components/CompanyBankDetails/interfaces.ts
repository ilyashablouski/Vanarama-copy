export interface ICompanyBankDetails {
  uuid?: string | null;
  bankName?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  joinedAtMonth?: string | null;
  joinedAtYear?: string | null;
  sortCode?: RegExpMatchArray | undefined | null;
}

export interface ICompanyBankDetailsProps {
  onSubmit: (values: ICompanyBankDetails) => void;
  account?: ICompanyBankDetails;
  data?: ICompanyBankDetails;
  isEdited: boolean;
}
