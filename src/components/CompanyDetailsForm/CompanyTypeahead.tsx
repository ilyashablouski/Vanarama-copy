import Formgroup from 'core/molecules/formgroup';
import Typeahead from 'core/molecules/typeahead';
import React, { FormEvent, useEffect, useState } from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { useFormContext } from 'react-hook-form';
import { SearchCompaniesQuery_searchCompanies_nodes as SearchResult } from '../../../generated/SearchCompaniesQuery';
import useDebounce from '../../hooks/useDebounce';
import { ICompanyDetailsFormValues } from './interfaces';
import useSearchCompanies from './useSearchCompanies';

interface IProps {
  onChange: (next: string) => void;
  onCompanySelected: (suggestion: SearchResult) => void;
  value: string;
}

const CompanyTypeahead: React.FC<IProps> = ({
  onChange,
  onCompanySelected,
  value,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm);
  const suggestions = useSearchCompanies(debouncedSearchTerm);
  const [errorMessage] = useRegisterCompanySearchField();

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
        error={errorMessage}
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

function useRegisterCompanySearchField() {
  const { errors, register } = useFormContext<ICompanyDetailsFormValues>();

  useEffect(() => {
    const validate = (result?: SearchResult) =>
      result && result.companyStatus !== 'active'
        ? 'This company seems not to be trading actively. Please try a new search'
        : undefined;

    register('companySearchResult', { validate });
  }, [register]);

  return [errors.companySearchResult?.message?.toString()];
}

export default CompanyTypeahead;
