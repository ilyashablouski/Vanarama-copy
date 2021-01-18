import React from 'react';
import Autosuggest, { InputProps } from 'react-autosuggest';
import TextInput from '../../atoms/textinput';
import { ITextInputProps } from '../../atoms/textinput/interfaces';

type TypeaheadProps<TOption> = Omit<
  Autosuggest.AutosuggestPropsSingleSection<TOption>,
  'theme' | 'renderSuggestionsContainer' | 'renderInputComponent'
> & {
  inputProps: Omit<ITextInputProps, 'onChange'> & InputProps<TOption>;
};

function Typeahead<TOption>(props: TypeaheadProps<TOption>) {
  return (
    <Autosuggest
      {...props}
      theme={{
        container: {
          position: 'relative',
          maxHeight: 200,
        },
        suggestionsList: 'typeahead--optgroup',
      }}
      renderInputComponent={InputComponent}
    />
  );
}

function InputComponent<T>({ onChange, ...inputProps }: InputProps<T>) {
  return (
    <TextInput
      {...inputProps}
      onChange={event => {
        onChange(event, {
          newValue: event.target.value,
          method: 'type',
        });
      }}
    />
  );
}

export default Typeahead;
