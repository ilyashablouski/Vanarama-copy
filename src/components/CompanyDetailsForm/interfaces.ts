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
    lable: string;
  };
  tradingAddress: {
    id: string;
    lable: string;
  };
  tradingDifferent: boolean;
  telephone: string;
  email: string;
}

export type InputMode = 'search' | 'manual';

export type SubmissionValues = ICompanyDetailsFormValues & {
  inputMode: InputMode;
};
