import * as Yup from 'yup';
import { IAddressSuggestion } from 'core/molecules/address-finder/interfaces';
import { diffInYear, historyToDateObject, validateDateString } from './dates';

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
  const yearsDifference = diffInYear(
    parseInt(yearOfBirth, 10),
    parseInt(monthOfBirth, 10),
    parseInt(dayOfBirth, 10),
  );

  if (
    !validateDateString(dayOfBirth, monthOfBirth, yearOfBirth) ||
    Number.isNaN(yearsDifference) ||
    yearsDifference > 120
  ) {
    return 'Oops, is your age correct?';
  }

  return yearsDifference < 18 ? 'Oops, you’re too young.' : null;
}

const POSTCODE_NORTHERN_IRELAND_REGEXP = /BT\d{1,2} \d\w{2,}/i;
export function checkForUnacceptableCountries(value: IAddressSuggestion) {
  return !POSTCODE_NORTHERN_IRELAND_REGEXP.test(value?.label ?? '');
}
