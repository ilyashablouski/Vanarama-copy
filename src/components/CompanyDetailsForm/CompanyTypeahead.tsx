import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import Typeahead from '@vanarama/uibook/lib/components/molecules/typeahead';
import React, { FormEvent, useState } from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { SearchCompaniesQuery_searchCompanies_nodes as SearchResult } from '../../../generated/SearchCompaniesQuery';
import useDebounce from '../../hooks/useDebounce';
import useSearchCompanies from './useSearchCompanies';

interface IProps {
  value: string;
  onChange: (next: string) => void;
  onCompanySelected: (suggestion: SearchResult) => void;
}

const CompanyTypeahead: React.FC<IProps> = ({
  onCompanySelected,
  value,
  onChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  const suggestions = useSearchCompanies(debouncedSearchTerm);

  function handleSuggestionSelected(
    event: FormEvent<any>,
    data: SuggestionSelectedEventData<SearchResult>,
  ) {
    if (data.method === 'enter') {
      event.preventDefault();
    }

    onCompanySelected(data.suggestion);
  }

  return (
    <>
      <Formgroup
        controlId="companySearch"
        label="Company Lookup"
        hint="Please enter name of your organisation or your organisation number"
      >
        <Typeahead<SearchResult>
          getSuggestionValue={_ => _.title!}
          inputProps={{
            id: 'companySearch',
            dataTestId: 'company-details_search',
            onChange: (_, { newValue }) => onChange(newValue),
            value,
          }}
          onSuggestionsClearRequested={() => setSearchTerm('')}
          onSuggestionsFetchRequested={({ value: nextValue }) =>
            setSearchTerm(nextValue)
          }
          onSuggestionSelected={handleSuggestionSelected}
          renderSuggestion={result => (
            <span className="text -small" title={result.title}>
              <b>{result.companyNumber}</b> - {result.title}
            </span>
          )}
          suggestions={suggestions}
        />
      </Formgroup>
    </>
  );
};

export default CompanyTypeahead;
