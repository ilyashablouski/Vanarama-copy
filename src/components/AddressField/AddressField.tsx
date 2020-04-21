import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { ILoqateSuggestion } from '@vanarama/uibook/lib/hooks/useLoqate/interfaces';
import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  error?: string;
  name: string;
  label: string;
}

const AddressField: React.FC<IProps> = ({ error, name, label }) => {
  const { control } = useFormContext();
  /**
   * NOTE: Controller doesn't seem to work well with useFieldArray, the value keeps getting
   * cleared when a field is removed. Tracking the state manually is a work
   * around for this until a fix is released. See https://github.com/react-hook-form/react-hook-form/issues/1456
   */
  const [address, setAddress] = useState<ILoqateSuggestion>();
  return (
    <Controller
      name={name}
      as={
        <AddressFinder
          apiKey={process.env.LOQATE_KEY!}
          onSuggestionChange={() => {
            // This will be overidden by RHF, hence it's empty
          }}
          selected={address}
        >
          <Formgroup error={error} controlId={name} label={label}>
            <AddressFinder.Input id={name} dataTestId={name} />
            <AddressFinder.Selected />
            <AddressFinder.Intermediate />
          </Formgroup>
          <AddressFinder.Results />
        </AddressFinder>
      }
      control={control}
      dataTestId={name}
      loqateApiKey={process.env.LOQATE_KEY!}
      onChangeName="onSuggestionChange"
      onChange={([suggestion]) => {
        setAddress(suggestion);
        return suggestion;
      }}
    />
  );
};

export default AddressField;
