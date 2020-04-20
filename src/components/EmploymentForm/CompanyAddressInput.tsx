import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import AddressFinder from '@vanarama/uibook/lib/components/molecules/address-finder';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  index: number;
}

const CompanyAddressInput: React.FC<IProps> = ({ index }) => {
  const { control, errors } = useFormContext<IEmploymentFormValues>();
  const error = errors.history?.[index]?.address?.message?.toString();
  const name = `history[${index}].address`;

  return (
    <Formgroup
      error={error}
      controlId={name}
      label="Company Postcode or Address"
    >
      <Controller
        id={name}
        name={name}
        as={AddressFinder}
        control={control}
        dataTestId={name}
        loqateApiKey={process.env.LOQATE_KEY!}
        onChange={([suggestion]) => suggestion?.id || ''}
      />
    </Formgroup>
  );
};

export default CompanyAddressInput;
