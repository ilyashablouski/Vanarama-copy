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
  hint?: string;
}

const FormikTypeAheadField: React.FC<IProps> = ({
  name,
  label,
  hint,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);
  const [searchValue, setSearchValue] = useState(field.value || '');
  const [isSelected, setSelected] = useState(false);
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
    setSelected(true);
  }

  function handleRenderSuggestion(result: string) {
    if (!result) {
      return (
        <span className="text -small">
          We can&apos;t find that - please give it another try
        </span>
      );
    }
    return <span className="text -small">{result}</span>;
  }

  return (
    <Formgroup controlId={name} label={label} error={error} hint={hint}>
      <Typeahead
        getSuggestionValue={suggestion => suggestion}
        inputProps={{
          id: name,
          dataTestId: name,
          ...field,
          ...rest,
          onBlur: (event: React.FocusEvent<any>) => {
            field.onBlur(event);
            if (!suggestions.length && !isSelected) {
              setSearchValue('');
              helpers.setValue('');
            }
            if (suggestions.length && !isSelected) {
              helpers.setValue(suggestions[0]);
            }
          },
          onChange: (event: React.FocusEvent<any>) => {
            field.onChange(event);
            setSelected(false);
          },
        }}
        onSuggestionsClearRequested={() => setSearchValue('')}
        onSuggestionsFetchRequested={({ value: nextValue }) =>
          setSearchValue(nextValue)
        }
        onSuggestionSelected={handleSuggestionSelected}
        renderSuggestion={handleRenderSuggestion}
        suggestions={suggestions}
      />
    </Formgroup>
  );
};

export default FormikTypeAheadField;
