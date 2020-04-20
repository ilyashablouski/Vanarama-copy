import * as Yup from 'yup';
import moment from 'moment';
import { historyToMoment } from './dates';

// eslint-disable-next-line import/prefer-default-export
export function checkFuture(this: Yup.TestContext) {
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
