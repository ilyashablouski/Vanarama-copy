import AddressFinder from 'core/molecules/address-finder';
import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React, { useRef, useState } from 'react';

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

  return (
    <AddressFinder
      selected={field.value}
      apiKey={process.env.LOQATE_KEY!}
      onSuggestionChange={suggestion => {
        helpers.setTouched(true);
        helpers.setValue(suggestion);
        setIsFocused(!suggestion);
      }}
    >
      <Formgroup
        error={error}
        controlId={name}
        label={label}
        hint={hint}
        hintButton={
          <AddressFinder.ManualAddingButtonHint dataTestId="cannot-find-your-address" />
        }
      >
        <AddressFinder.Input
          id={name}
          dataTestId={name}
          ref={inputRef}
          onBlur={event => {
            setIsFocused(false);
            field.onBlur(event);
          }}
          onFocus={() => setIsFocused(true)}
        />
        <AddressFinder.Selected dataTestId={name} />
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
