import React from 'react';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import TextInput from '@vanarama/uibook/lib/components/atoms/textinput';
import { useFormContext } from 'react-hook-form';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  index: number;
}

const GrossIncomeInput: React.FC<IProps> = ({ index }) => {
  const { errors, register } = useFormContext<IEmploymentFormValues>();
  const error = errors.history?.[index]?.income?.message?.toString();
  const name = `history[${index}].income`;

  return (
    <Formgroup controlId={name} label="Gross Annual Income" error={error}>
      <TextInput
        dataTestId={name}
        id={name}
        name={name}
        ref={register()}
        prefix="£"
        type="number"
      />
    </Formgroup>
  );
};

export default GrossIncomeInput;
