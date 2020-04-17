import Select from '@vanarama/uibook/lib/components/atoms/select';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface IProps {
  error?: string;
  id: string;
  label: string;
}

/**
 * A helper component that encapsulates all of the boilerplate for putting a
 * select field in a form with RHF
 */
const SelectField: React.FC<IProps> = ({ children, error, id, label }) => {
  const { register } = useFormContext();
  return (
    <Formgroup error={error} controlId={id} label={label}>
      <Select id={id} name={id} dataTestId={id} ref={register()}>
        {children}
      </Select>
    </Formgroup>
  );
};

export default SelectField;
