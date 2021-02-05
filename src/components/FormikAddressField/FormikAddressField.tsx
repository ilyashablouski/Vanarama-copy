import AddressFinder from 'core/molecules/address-finder';
import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React, { useState } from 'react';

interface IProps {
  name: string;
  label: string;
}

const FormikAddressField: React.FC<IProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const error = (meta.touched && !isFocused && meta.error) || undefined;

  return (
    <AddressFinder
      apiKey={process.env.LOQATE_KEY!}
      onSuggestionChange={suggestion => {
        helpers.setValue(suggestion);
      }}
      selected={field.value}
    >
      <Formgroup error={error} controlId={name} label={label}>
        <AddressFinder.Input
          id={name}
          dataTestId={name}
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
    </AddressFinder>
  );
};

export default FormikAddressField;
