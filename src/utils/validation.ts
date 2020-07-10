import * as Yup from 'yup';
import moment from 'moment';
import { historyToMoment } from './dates';

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

export function dateOfBirthValidator(this: Yup.TestContext) {
  const { createError, path, parent } = this;
  const error = isDateOfBirthValid(parent);
  return error ? createError({ message: error, path }) : true;
}

type WithDateOfBirthFields = {
  dayOfBirth: string;
  monthOfBirth: string;
  yearOfBirth: string;
};

export function isDateOfBirthValid<T extends WithDateOfBirthFields>({
  dayOfBirth,
  monthOfBirth,
  yearOfBirth,
}: T) {
  const now = moment();
  const parsed = moment(
    `${dayOfBirth}-${monthOfBirth}-${yearOfBirth}`,
    'DD-MM-YYYY',
  );

  if (!parsed.isValid() || now.diff(parsed, 'years') > 120) {
    return 'Oops, is your age correct?';
  }

  return now.diff(parsed, 'years') < 18 ? 'Oops, you’re too young.' : null;
}
