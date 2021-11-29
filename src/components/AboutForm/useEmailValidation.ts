import { IAboutFormValues } from './interface';
import useFirstRenderEffect from '../../hooks/useFirstRenderEffect';

type AboutFormField = keyof IAboutFormValues;

export default function useEmailValidation(
  watch: (name: AboutFormField) => string,
  triggerValidation: (fields: AboutFormField) => void,
) {
  const email = watch('email');

  useFirstRenderEffect(() => {
    if (email) {
      triggerValidation('email');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);
}
