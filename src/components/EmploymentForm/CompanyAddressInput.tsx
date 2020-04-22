import React from 'react';
import { useFormContext } from 'react-hook-form';
import AddressField from '../AddressField/AddressField';

interface IProps {
  index: number;
}

const CompanyAddressInput: React.FC<IProps> = ({ index }) => {
  const { errors } = useFormContext();
  const error = errors.history?.[index]?.address?.message?.toString();
  const name = `history[${index}].address`;
  return (
    <AddressField
      error={error}
      label="Company Postcode or Address"
      name={name}
    />
  );
};

export default CompanyAddressInput;
