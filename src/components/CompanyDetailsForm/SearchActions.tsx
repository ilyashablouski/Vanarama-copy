import React from 'react';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import { SearchCompaniesQuery_searchCompanies_nodes as CompanySearchResult } from '../../../generated/SearchCompaniesQuery';

interface IProps {
  confirmedCompany?: CompanySearchResult;
  onProceed: () => void;
  onSearchAgain: () => void;
}

export default function SearchActions({
  confirmedCompany,
  onProceed,
  onSearchAgain,
}: IProps) {
  return (
    <div className="button-group">
      <Button
        color="primary"
        dataTestId="company-details_proceed"
        disabled={Boolean(confirmedCompany)}
        label="Yes And Proceed"
        onClick={onProceed}
        size="small"
        type="button"
      />
      <Button
        color="primary"
        dataTestId="company-details_search-again"
        fill="outline"
        label="Search Again"
        onClick={onSearchAgain}
        size="small"
        type="button"
      />
    </div>
  );
}
