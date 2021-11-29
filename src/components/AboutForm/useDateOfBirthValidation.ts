import { IAboutFormValues } from './interface';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';

type AboutFormField = keyof IAboutFormValues;

export default function useDateOfBirthValidation(
  watch: (name: AboutFormField) => string,
  triggerValidation: (fields: AboutFormField[]) => void,
) {
  const day = watch('dayOfBirth');
  const month = watch('monthOfBirth');
  const year = watch('yearOfBirth');

  useFirstRenderEffect(() => {
    if (day && month && year) {
      triggerValidation(['dayOfBirth', 'yearOfBirth', 'monthOfBirth']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day, month, year]);
}
