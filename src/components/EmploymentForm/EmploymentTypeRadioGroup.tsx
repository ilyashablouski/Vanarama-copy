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
  const error = errors.history?.[index]?.contract?.message?.toString();
  const name = `history[${index}].contract`;

  return (
    <Formgroup label="Are You" error={error}>
      <Radio
        id={`${name}_fulltime`}
        name={name}
        dataTestId={`${name}_fulltime`}
        label="Full Time"
        ref={register()}
        value="Full time"
      />
      <Radio
        id={`${name}_parttime`}
        name={name}
        dataTestId={`${name}_parttime`}
        label="Part Time"
        ref={register()}
        value="Part time"
      />
    </Formgroup>
  );
};

export default EmploymentTypeRadioGroup;
