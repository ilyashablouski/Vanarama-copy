import * as Yup from 'yup';
import { checkFuture } from '../../utils/validation';
import { IAddressFormValues } from './interfaces';

export default Yup.object().shape<IAddressFormValues>({
  history: Yup.array().of(
    Yup.object().shape({
      address: Yup.string().required('Please enter your address'),
      status: Yup.string().required('Please select your property status'),
      month: Yup.string()
        .required('Please select the date you moved in')
        .test(
          'max',
          'Oops, the date you moved in cannot be in the future',
          checkFuture,
        ),
      year: Yup.string()
        .required('Please select the date you moved in')
        .test(
          'max',
          'Oops, the date you moved in cannot be in the future',
          checkFuture,
        ),
    }),
  ),
});
