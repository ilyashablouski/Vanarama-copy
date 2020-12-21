import TextInput from 'core/atoms/textinput';
import { ITextInputProps } from 'core/atoms/textinput/interfaces';
import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';

interface IProps extends ITextInputProps {
  name: string;
  label: string;
}

const FormikTextField: React.FC<IProps> = ({ name, label, ...rest }) => {
  const [field, meta] = useField(name);
  const error = (meta.touched && meta.error) || undefined;
  return (
    <Formgroup controlId={name} label={label} error={error}>
      <TextInput dataTestId={name} id={name} {...rest} {...field} />
    </Formgroup>
  );
};

export default FormikTextField;
