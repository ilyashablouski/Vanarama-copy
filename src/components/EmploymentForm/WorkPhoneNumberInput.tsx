import React from 'react';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import { useFormContext } from 'react-hook-form';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  index: number;
}

const WorkPhoneNumberInput: React.FC<IProps> = ({ index }) => {
  const { errors, register } = useFormContext<IEmploymentFormValues>();
  const error = errors.history?.[index]?.phoneNumber?.message?.toString();
  const name = `history[${index}].phoneNumber`;

  return (
    <Formgroup controlId={name} label="Work Phone Number" error={error}>
      <TextInput dataTestId={name} id={name} name={name} ref={register()} />
    </Formgroup>
  );
};

export default WorkPhoneNumberInput;
