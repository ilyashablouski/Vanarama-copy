import React from 'react';
import TextInput from '../../../atoms/textinput';
import { ITextInputProps } from '../../../atoms/textinput/interfaces';
import { useAddressFinderContext } from '../context';

const AddressFinderInput: React.FC<Omit<
  ITextInputProps,
  'value'
>> = React.forwardRef<HTMLInputElement, ITextInputProps>((props, ref) => {
  const {
    onChange,
    preventBlur,
    selectedSuggestion,
    setInputBlur,
    setInputFocus,
    value,
    formFocus,
    setBlurForm,
    showManualForm,
  } = useAddressFinderContext();

  if (selectedSuggestion || showManualForm) {
    return null;
  }

  return (
    <TextInput
      {...props}
      ref={ref}
      onBlur={event => {
        if (!preventBlur) {
          setInputBlur();
        }
        if (!formFocus) {
          props.onBlur?.(event);
          setInputBlur();
        } else {
          (ref as React.RefObject<HTMLInputElement>)?.current?.focus();
          props.onFocus?.(event);
          setBlurForm?.();
        }
      }}
      onChange={event => {
        props.onChange?.(event);
        onChange(event);
      }}
      onFocus={event => {
        props.onFocus?.(event);
        setInputFocus();
      }}
      value={value.label}
    />
  );
});

export default AddressFinderInput;
