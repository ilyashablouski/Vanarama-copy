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
      onBlur={e => {
        if (!preventBlur) {
          setInputBlur();
        }
        if (!formFocus) {
          props.onBlur?.(e);
          setInputBlur();
        } else {
          (ref as React.RefObject<HTMLInputElement>)?.current?.focus();
          props.onFocus?.(e);
          setBlurForm?.();
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
      value={value.label}
    />
  );
});

export default AddressFinderInput;
