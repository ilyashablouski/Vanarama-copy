import * as Yup from 'yup';
import moment from 'moment';
import { historyToMoment } from '../../utils/dates';

function checkFuture() {
  const { month, year } = this.parent as any;
  if (month && year) {
    const asMoment = historyToMoment({ month, year });
    const now = moment();
    if (asMoment.isAfter(now)) {
      return false;
    }
  }

  return true;
}

export default Yup.object().shape({
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
