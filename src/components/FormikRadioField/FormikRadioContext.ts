import { FieldHelperProps, FieldInputProps } from 'formik';
import { createContext, useContext } from 'react';

interface IContext {
  field: FieldInputProps<any>;
  helpers: FieldHelperProps<any>;
  name: string;
}

const FormikRadioContext = createContext<IContext | null>(null);

export function useFormikRadioContext() {
  const context = useContext(FormikRadioContext);
  if (!context) {
    throw new Error('Must be used in scope of a FormikRadioProvider');
  }

  return context;
}

export const FormikRadioProvider = FormikRadioContext.Provider;
