import Typeahead from '@vanarama/uibook/lib/components/molecules/typeahead';
import { ITextInputProps } from '@vanarama/uibook/lib/components/atoms/textinput/interfaces';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useField } from 'formik';
import React, { FormEvent, useState } from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { useSicCodes } from '../../containers/CompanyDetailsFormContainer/gql';
import { sicCodes_sicCodes_sicData as ISuggestions } from '../../../generated/sicCodes';
import useDebounce from '../../hooks/useDebounce';

interface IProps extends ITextInputProps {
  name: string;
  label: string;
}

const FormikTypeAheadField: React.FC<IProps> = ({ name, label, ...rest }) => {
  const [field, meta, helpers] = useField(name);
  const [searchValue, setSearchValue] = useState(field.value || '');
  const debouncedSearchTerm = useDebounce(searchValue);
  const suggestions = useSicCodes(debouncedSearchTerm);
  const error = (meta.touched && meta.error) || undefined;

  function handleSuggestionSelected(
    event: FormEvent<any>,
    data: SuggestionSelectedEventData<ISuggestions>,
  ) {
    if (data.method === 'enter') {
      event.preventDefault();
    }
    // set value for container state this array will be send in mutation
    helpers.setValue(data.suggestionValue);
  }
  return (
    <Formgroup controlId={name} label={label} error={error}>
      <Typeahead
        getSuggestionValue={suggestion => suggestion.description}
        inputProps={{
          id: name,
          dataTestId: name,
          ...field,
          ...rest,
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
  );
};

export default FormikTypeAheadField;
