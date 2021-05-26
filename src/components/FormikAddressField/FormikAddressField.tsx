import AddressFinder from 'core/molecules/address-finder';
import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';

interface IProps {
  name: string;
  label: string;
  hint?: string;
  skipManualInput?: boolean;
}

const FormikAddressField: React.FC<IProps> = ({
  name,
  label,
  hint,
  skipManualInput,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const error = (meta.touched && !isFocused && meta.error) || undefined;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (field.value) {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  }, [field.value]);

  return (
    <AddressFinder
      apiKey={process.env.LOQATE_KEY!}
      onSuggestionChange={suggestion => {
        helpers.setTouched(true);
        helpers.setValue(suggestion);
      }}
      selected={field.value}
    >
      <Formgroup error={error} controlId={name} label={label} hint={hint}>
        <AddressFinder.Input
          id={name}
          dataTestId={name}
          ref={inputRef}
          onBlur={e => {
            setIsFocused(false);
            field.onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
        />
        <AddressFinder.Selected />
        <AddressFinder.Intermediate />
      </Formgroup>
      <AddressFinder.Results />
      {!skipManualInput && (
        <>
          <AddressFinder.ManualAddingButton />
          <AddressFinder.ManualAddressForm />
        </>
      )}
    </AddressFinder>
  );
};

export default FormikAddressField;
