import { SearchCompaniesQuery_searchCompanies_nodes as CompanySearchResult } from '../../../generated/SearchCompaniesQuery';

export interface ICompanyDetailsFormValues {
  companySearchResult?: CompanySearchResult;
  companyName: string;
  companyNumber: string;
  tradingSinceMonth: string;
  tradingSinceYear: string;
  nature: string;
  registeredAddress: {
    id: string;
    label: string;
  };
  tradingAddress: {
    id: string;
    label: string;
  };
  tradingDifferent: boolean;
  telephone: string;
  email: string;
}

export type InputMode = 'search' | 'manual';

export type SubmissionValues = ICompanyDetailsFormValues & {
  inputMode: InputMode;
};
