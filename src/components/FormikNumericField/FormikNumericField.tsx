import NumericInput from '@vanarama/uibook/lib/components/atoms/numeric-input';
import { ITextInputProps } from '@vanarama/uibook/lib/components/atoms/textinput/interfaces';
import Formgroup from '@vanarama/uibook/lib/components/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';

interface IProps extends ITextInputProps {
  name: string;
  label: string;
}

const FormikNumericField: React.FC<IProps> = ({ name, label, ...rest }) => {
  const [field, meta] = useField(name);
  const error = (meta.touched && meta.error) || undefined;
  return (
    <Formgroup controlId={name} label={label} error={error}>
      <NumericInput dataTestId={name} id={name} {...rest} {...field} />
    </Formgroup>
  );
};

export default FormikNumericField;
