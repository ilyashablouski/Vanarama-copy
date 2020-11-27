import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';

interface IProps {
  name: string;
  label: string;
}

const FormikAddressField: React.FC<IProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const error = (meta.touched && meta.error) || undefined;
  return (
    <AddressFinder
      apiKey="CG96-BE17-EY43-CM69"
      onSuggestionChange={suggestion => {
        helpers.setValue(suggestion);
      }}
      selected={field.value}
    >
      <Formgroup error={error} controlId={name} label={label}>
        <AddressFinder.Input
          id={name}
          dataTestId={name}
          onBlur={field.onBlur}
        />
        <AddressFinder.Selected />
        <AddressFinder.Intermediate />
      </Formgroup>
      <AddressFinder.Results />
    </AddressFinder>
  );
};

export default FormikAddressField;
