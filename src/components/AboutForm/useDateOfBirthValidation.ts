import { useEffect } from 'react';
import { IAboutFormValues } from './interface';

type AboutFormField = keyof IAboutFormValues;

export default function useDateOfBirthValidation(
  watch: (name: AboutFormField) => string,
  triggerValidation: (fields: AboutFormField[]) => void,
) {
  const day = watch('dayOfBirth');
  const mth = watch('monthOfBirth');
  const year = watch('yearOfBirth');

  useEffect(() => {
    if (day && mth && year) {
      triggerValidation(['dayOfBirth', 'yearOfBirth', 'monthOfBirth']);
    }
  }, [day, mth, year]);
}
