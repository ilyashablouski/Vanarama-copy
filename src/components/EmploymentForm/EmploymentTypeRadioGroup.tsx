import Radio from '@vanarama/uibook/lib/components/atoms/radio';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { IEmploymentFormValues } from './interfaces';

interface IProps {
  index: number;
}

const EmploymentTypeRadioGroup: React.FC<IProps> = ({ index }) => {
  const { errors, register } = useFormContext<IEmploymentFormValues>();
  const error = errors.history?.[index]?.type?.message?.toString();
  const name = `history[${index}].type`;

  return (
    <Formgroup label="Are You" error={error}>
      <Radio
        id={`${name}_fulltime`}
        name={name}
        dataTestId={`${name}_fulltime`}
        label="Full Time"
        ref={register()}
        value="Full Time"
      />
      <Radio
        id={`${name}_parttime`}
        name={name}
        dataTestId={`${name}_parttime`}
        label="Part Time"
        ref={register()}
        value="Part Time"
      />
    </Formgroup>
  );
};

export default EmploymentTypeRadioGroup;
