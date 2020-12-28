import * as Yup from 'yup';
import { diffInYear, historyToDateObject } from './dates';

export function checkFuture(this: Yup.TestContext) {
  const { month, year } = this.parent as any;
  if (month && year) {
    const asMoment = historyToDateObject({ month, year });
    const now = new Date();
    if (asMoment.getTime() > now.getTime()) {
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
  const parsed = `${monthOfBirth}-${dayOfBirth}-${yearOfBirth}`;

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(new Date(parsed).valueOf()) || diffInYear(parsed) > 120) {
    return 'Oops, is your age correct?';
  }

  return diffInYear(parsed) < 18 ? 'Oops, you’re too young.' : null;
}
