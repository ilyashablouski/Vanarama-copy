export interface ICompanyBankDetails {
  uuid: string | null;
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  // joinedAt: any | null;
  joinedAtMonth: string | null;
  joinedAtYear: string | null;
  sortCode: string | null;
}

export interface ICompanyBankDetailsProps {
  onSubmit: (values: ICompanyBankDetails) => void;
  account?: ICompanyBankDetails;
  data?: ICompanyBankDetails;
  isEdited: boolean;
}
