import * as yup from 'yup';
import moment from 'moment';
import { IAboutFormValues } from './interface';

const reqMsg = (rel: string) => ` Please enter your ${rel}`;

function isAgeValid({ dayOfBirth, monthOfBirth, yearOfBirth }) {
  const dateStr = `${dayOfBirth} ${monthOfBirth} ${yearOfBirth}`;
  const validMinAge =
    moment().diff(moment(dateStr, 'DD-MMMM-YYYY'), 'years') >= 18;

  const validMaxAge =
    moment().diff(moment(dateStr, 'DD-MMMM-YYYY'), 'years') <= 120;

  if (!validMaxAge) {
    return 'Oops, is your age correct?';
  }

  if (!validMinAge) {
    return 'Oops, you’re too young.';
  }

  return null;
}

function ageValidator() {
  const { createError, path, parent } = this;
  const error = isAgeValid(parent);
  return error ? createError({ message: error, path }) : true;
}

const ValidationSchema = yup.object().shape<IAboutFormValues>({
  title: yup.string().required('Please select a title'),
  firstName: yup
    .string()
    .required(reqMsg('first name'))
    .min(
      2,
      'Oops, this name’s too short. Please make it 2 characters or longer',
    )
    .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
  lastName: yup
    .string()
    .required(reqMsg('last name'))
    .min(
      2,
      'Oops, this name’s too short. Please make it 2 characters or longer',
    )
    .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
  email: yup
    .string()
    .required(reqMsg('email address'))
    .max(254, 'Oops, the email address entered is too long')
    .email('Oops, this email address is invalid'),
  mobile: yup
    .string()
    .required(reqMsg('mobile number'))
    .max(16)
    .matches(
      // /^((\+44(0|\(0\)|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/, // UK Mobile.
      /^((\+[0-9]+(0|\(0\)|\s0\s|\s)?)|0)[0-9]+\d{3}(\s)?\d{6}/, // Worldwide mobile.
      'Please enter mobile number without spaces or hyphens',
    ),
  dayOfBirth: yup
    .string()
    .required('Please complete your date of birth')
    .test('age', 'Invalid age', ageValidator),
  monthOfBirth: yup
    .string()
    .required('Please complete your date of birth')
    .test('age', 'Invalid age', ageValidator),
  yearOfBirth: yup
    .string()
    .required('Please complete your date of birth')
    .test('age', 'Invalid age', ageValidator),
  countryOfBirth: yup.string().required(reqMsg('country of birth')),
  nationality: yup.string().required(reqMsg('nationality')),
  maritalStatus: yup.string().required(reqMsg('marital status')),
  dependants: yup.string().required('Please enter number of dependants'),
  adultsInHousehold: yup.string().required('Please enter adults in household'),
  consent: yup.boolean().notRequired(),
  termsAndCons: yup
    .boolean()
    .oneOf([true], 'The terms and conditions must be accepted.'),
});

export default ValidationSchema;
