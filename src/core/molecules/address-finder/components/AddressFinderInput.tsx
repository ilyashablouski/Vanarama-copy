import React from 'react';
import TextInput from '../../../atoms/textinput';
import { ITextInputProps } from '../../../atoms/textinput/interfaces';
import { useAddressFinderContext } from '../context';

const AddressFinderInput: React.FC<Omit<ITextInputProps, 'value'>> = props => {
  const {
    onChange,
    preventBlur,
    selectedSuggestion,
    setInputBlur,
    setInputFocus,
    value,
  } = useAddressFinderContext();

  if (selectedSuggestion) {
    return null;
  }

  return (
    <TextInput
      {...props}
      onBlur={e => {
        props.onBlur?.(e);
        if (!preventBlur) {
          setInputBlur();
        }
      }}
      onChange={e => {
        props.onChange?.(e);
        onChange(e);
      }}
      onFocus={e => {
        props.onFocus?.(e);
        setInputFocus();
      }}
      value={value}
    />
  );
};

export default AddressFinderInput;
