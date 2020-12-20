import Typeahead from 'core/molecules/typeahead';
import { ITextInputProps } from 'core/atoms/textinput/interfaces';
import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React, { FormEvent, useState } from 'react';
import { SuggestionSelectedEventData } from 'react-autosuggest';
import { useOccupationList } from '../EmploymentForm/gql';
import useDebounce from '../../hooks/useDebounce';

interface IProps extends ITextInputProps {
  name: string;
  label: string;
}

const FormikTypeAheadField: React.FC<IProps> = ({ name, label, ...rest }) => {
  const [field, meta, helpers] = useField(name);
  const [searchValue, setSearchValue] = useState(field.value || '');
  const debouncedSearchTerm = useDebounce(searchValue);
  const suggestions = useOccupationList(debouncedSearchTerm);
  const error = (meta.touched && meta.error) || undefined;

  function handleSuggestionSelected(
    event: FormEvent<any>,
    data: SuggestionSelectedEventData<string>,
  ) {
    if (data.method === 'enter') {
      event.preventDefault();
    }

    // set formik field value
    helpers.setValue(data.suggestionValue);
  }

  return (
    <Formgroup controlId={name} label={label} error={error}>
      <Typeahead
        getSuggestionValue={suggestion => suggestion}
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
          <span className="text -small">{result}</span>
        )}
        suggestions={suggestions}
      />
    </Formgroup>
  );
};

export default FormikTypeAheadField;
