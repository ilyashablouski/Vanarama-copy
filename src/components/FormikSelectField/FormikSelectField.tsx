import Select from 'core/atoms/select';
import { ISelectProps } from 'core/atoms/select/interfaces';
import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';

interface IProps extends ISelectProps {
  name: string;
  label?: string;
}

const FormikSelectField: React.FC<IProps> = ({
  children,
  name,
  label,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const error = (meta.touched && meta.error) || undefined;
  return (
    <Formgroup error={error} controlId={name} label={label}>
      <Select id={name} dataTestId={name} {...rest} {...field}>
        {children}
      </Select>
    </Formgroup>
  );
};

export default FormikSelectField;
