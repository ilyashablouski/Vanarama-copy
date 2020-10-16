import UIBookCheckbox from '@vanarama/uibook/lib/components/atoms/checkbox';
import { ICheckboxProps } from '@vanarama/uibook/lib/components/atoms/checkbox/interfaces';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';

interface IProps extends ICheckboxProps {
  name: string;
  label: string;
  checkboxLabel: string;
  isChecked?: boolean;
}

const FormikCheckboxField: React.FC<IProps> = ({
  name,
  label,
  checkboxLabel,
  isChecked,
  ...rest
}) => {
  const [field, meta] = useField(name);
  const error = (meta.touched && meta.error) || undefined;
  return (
    <Formgroup controlId={name} label={label} error={error}>
      <UIBookCheckbox
        checked={isChecked}
        dataTestId={name}
        label={checkboxLabel}
        {...rest}
        {...field}
      />
    </Formgroup>
  );
};

export default FormikCheckboxField;
