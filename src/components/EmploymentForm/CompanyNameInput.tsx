import React from 'react';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import { useFormContext } from 'react-hook-form';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  index: number;
}

const CompanyNameInput: React.FC<IProps> = ({ index }) => {
  const { errors, register } = useFormContext<IEmploymentFormValues>();
  const error = errors.history?.[index]?.company?.message?.toString();
  const name = `history[${index}].company`;

  return (
    <Formgroup controlId={name} label="Company Name" error={error}>
      <TextInput dataTestId={name} id={name} name={name} ref={register()} />
    </Formgroup>
  );
};

export default CompanyNameInput;
