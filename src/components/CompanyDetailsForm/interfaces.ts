export interface ICompanyDetailsFormValues {
  companyName: string;
  companyNumber: string;
  tradingSinceMonth: string;
  tradingSinceYear: string;
  nature: string;
  registeredAddress: {
    id: string;
  };
  tradingAddress: {
    id: string;
  };
  tradingDifferent: boolean;
  telephone: string;
  email: string;
}

export type InputMode = 'search' | 'manual';
