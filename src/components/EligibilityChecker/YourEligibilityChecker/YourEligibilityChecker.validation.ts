import * as yup from 'yup';
import { IYourEligiblityCheckerValues } from './interface';
import { diffInYear } from '../../../utils/dates';

const reqMsg = (rel: string) => `Please enter your ${rel}`;

function isAgeValid({
  dayOfBirth,
  monthOfBirth,
  yearOfBirth,
}: IYourEligiblityCheckerValues) {
  const dateStr = `${monthOfBirth}-${dayOfBirth}-${yearOfBirth}`;
  const validMinAge = diffInYear(dateStr) >= 18;
  const validMaxAge = diffInYear(dateStr) <= 120;

  if (!validMaxAge) {
    return 'Oops, is your age correct?';
  }

  if (!validMinAge) {
    return 'Oops, you’re too young.';
  }

  return null;
}

function ageValidator(this: yup.TestContext) {
  const { createError, path, parent } = this;
  const error = isAgeValid(parent);

  return error ? createError({ message: error, path }) : true;
}

const ValidationSchema = yup.object().shape<IYourEligiblityCheckerValues>(
  {
    addressFinder: yup
      .object()
      .required('Please enter your postcode or address'),
    firstName: yup
      .string()
      .required(reqMsg('first name'))
      .matches(
        /^^[a-zA-Z'-\s]+$/,
        'Please use only letters, apostrophes and dashes',
      )
      .min(
        2,
        'Oops, this name’s too short. Please make it 2 characters or longer',
      )
      .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
    lastName: yup
      .string()
      .required(reqMsg('last name'))
      .matches(
        /^^[a-zA-Z'-\s]+$/,
        'Please use only letters, apostrophes and dashes',
      )
      .min(
        2,
        'Oops, this name’s too short. Please make it 2 characters or longer',
      )
      .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
    email: yup
      .string()
      .required(reqMsg('email address'))
      .max(
        254,
        'Oops, this email is too long. Please keep it to 254 characters',
      )
      .email('Oops, this email address is invalid'),
    dayOfBirth: yup
      .string()
      .required('Please complete your date of birth')
      .when(['monthOfBirth', 'yearOfBirth'], {
        is: (monthOfBirth, yearOfBirth) => !!monthOfBirth && !!yearOfBirth,
        then: yup.string().test('age', 'Invalid age', ageValidator),
      }),
    monthOfBirth: yup
      .string()
      .required('Please complete your date of birth')
      .when(['dayOfBirth', 'yearOfBirth'], {
        is: (dayOfBirth, yearOfBirth) => !!dayOfBirth && !!yearOfBirth,
        then: yup.string().test('age', 'Invalid age', ageValidator),
      }),
    yearOfBirth: yup
      .string()
      .required('Please complete your date of birth')
      .when(['dayOfBirth', 'monthOfBirth'], {
        is: (dayOfBirth, monthOfBirth) => !!dayOfBirth && !!monthOfBirth,
        then: yup.string().test('age', 'Invalid age', ageValidator),
      }),
    promotions: yup.boolean().notRequired(),
  },
  [
    ['dayOfBirth', 'monthOfBirth'],
    ['dayOfBirth', 'yearOfBirth'],
    ['monthOfBirth', 'yearOfBirth'],
  ],
);

export default ValidationSchema;
