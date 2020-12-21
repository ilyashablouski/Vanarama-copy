import Formgroup from 'core/molecules/formgroup';
import { useField } from 'formik';
import React from 'react';
import { FormikRadioProvider } from './FormikRadioContext';
import Radio from './Radio';

interface IProps {
  name: string;
  label: string;
}

type TFormikRadioField = React.FC<IProps> & {
  Radio: typeof Radio;
};

const FormikRadioField: TFormikRadioField = ({ name, label, children }) => {
  const [field, meta, helpers] = useField(name);
  const error = (meta.touched && meta.error) || undefined;
  return (
    <Formgroup label={label} error={error}>
      <FormikRadioProvider value={{ field, helpers, name }}>
        {children}
      </FormikRadioProvider>
    </Formgroup>
  );
};

FormikRadioField.Radio = Radio;
export default FormikRadioField;
