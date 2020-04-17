import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

interface IProps {
  error?: string;
  id: string;
  label: string;
}

/**
 * A helper component that encapsulates all of the boilerplate for putting an
 * AddressFinder in a form with RHF
 */
const AddressFinderField: React.FC<IProps> = ({ error, id, label }) => {
  const { control } = useFormContext();
  return (
    <Formgroup error={error} controlId={id} label={label}>
      <Controller
        id={id}
        name={id}
        as={AddressFinder}
        control={control}
        dataTestId={id}
        loqateApiKey={process.env.LOQATE_KEY!}
        onChange={([suggestion]) => suggestion?.id || ''}
      />
    </Formgroup>
  );
};

export default AddressFinderField;
