import * as Yup from 'yup';

import {
  checkFuture,
  checkForUnacceptableCountries,
} from '../../utils/validation';
import { Nullish } from '../../types/common';
import { TAddressEntry } from './interfaces';

export default Yup.object().shape({
  history: Yup.array().of(
    Yup.object().shape({
      address: Yup.object()
        .required('Please enter your address')
        .test(
          'unacceptableCountries',
          'We are not able to accept applications from Northern Ireland',
          (value: Nullish<TAddressEntry['address']>) =>
            !checkForUnacceptableCountries(value?.label),
        ),
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
