import Formgroup from 'core/molecules/formgroup';
import Typeahead from 'core/molecules/typeahead';
import React, { FormEvent, useEffect, useState } from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { useFormContext } from 'react-hook-form';
import { useSicCodes } from '../../containers/CompanyDetailsFormContainer/gql';
import { sicCodes_sicCodes_sicData as ISuggestions } from '../../../generated/sicCodes';
import useDebounce from '../../hooks/useDebounce';

interface IProps {
  setNatureValue: (suggestion: string[]) => void;
  value: string[];
}

const NatureTypeahead: React.FC<IProps> = ({ setNatureValue, value }) => {
  const { errors, setValue, register } = useFormContext();
  // value for search request
  const [searchValue, setSearchValue] = useState(value[0] || '');
  // field value
  const [fieldValue, setFieldValue] = useState(value[0] || '');
  const debouncedSearchTerm = useDebounce(searchValue);
  const suggestions = useSicCodes(debouncedSearchTerm);

  useEffect(() => {
    register('nature', { required: 'Please enter the nature of business' });
    // using for form validation
    setValue('nature', value[0] || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register, setValue]);

  function handleSuggestionSelected(
    event: FormEvent<any>,
    data: SuggestionSelectedEventData<ISuggestions>,
  ) {
    if (data.method === 'enter') {
      event.preventDefault();
    }
    // set value for container state this array will be send in mutation
    setNatureValue([data.suggestionValue]);
    // using for form validation
    setValue('nature', data.suggestionValue, true);
  }
  return (
    <>
      <Formgroup
        error={errors.nature?.message?.toString()}
        controlId="nature"
        label="Nature of Business"
        hint="e.g. building firm/marketing agency"
      >
        <Typeahead
          getSuggestionValue={suggestion => suggestion.description}
          inputProps={{
            id: 'nature',
            dataTestId: 'company-details_nature',
            onChange: (_, { newValue }) => setFieldValue(newValue),
            value: fieldValue,
          }}
          onSuggestionsClearRequested={() => setSearchValue('')}
          onSuggestionsFetchRequested={({ value: nextValue }) =>
            setSearchValue(nextValue)
          }
          onSuggestionSelected={handleSuggestionSelected}
          renderSuggestion={result => (
            <span className="text -small" title={result.description}>
              <b>{result.sicCode}</b> - {result.description}
            </span>
          )}
          suggestions={suggestions}
        />
      </Formgroup>
    </>
  );
};

export default NatureTypeahead;
