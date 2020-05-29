import { useEffect } from 'react';
import { IYourEligiblityCheckerValues } from './interface';

type YourEligiblityCheckerField = keyof IYourEligiblityCheckerValues;

export default function useDateOfBirthValidation(
  watch: (name: YourEligiblityCheckerField) => string,
  triggerValidation: (fields: YourEligiblityCheckerField[]) => void,
) {
  const day = watch('dayOfBirth');
  const mth = watch('monthOfBirth');
  const year = watch('yearOfBirth');

  useEffect(() => {
    if (day && mth && year) {
      triggerValidation(['dayOfBirth', 'yearOfBirth', 'monthOfBirth']);
    }
  }, [day, mth, year, triggerValidation]);
}
