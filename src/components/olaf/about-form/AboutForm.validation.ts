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
  if (error) {
    return createError({ message: error, path });
  }
  parent.validateAt('dayOfBirth', parent.dayOfBirth);
  parent.validateAt('monthOfBirth', parent.monthOfBirth);
  parent.validateAt('yearOfBirth', parent.dayOfBirth);
  return true;
}

const ValidationSchema = yup.object().shape<IAboutFormValues>(
  {
    title: yup.string().required('Please select a title'),
    firstName: yup
      .string()
      .required(reqMsg('first name'))
      .min(
        2,
        'Oops, this name’s too short. Please make it longer than 2 characters',
      )
      .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
    lastName: yup
      .string()
      .required(reqMsg('last name'))
      .min(
        2,
        'Oops, this name’s too short. Please make it longer than 2 characters',
      )
      .max(50, 'Oops, this name’s too long. Please keep it to 50 characters'),
    email: yup
      .string()
      .required(reqMsg('Email'))
      .email('Oops, this email address is invalid'),
    mobile: yup
      .string()
      .matches(
        /^([+]\d{2})?\d{11,12}$/,
        'Please enter mobile number without spaces or hyphens',
      )
      .required(reqMsg('Mobile')),
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
    countryOfBirth: yup.string().required(reqMsg('country of birth')),
    nationality: yup.string().required(reqMsg('nationality')),
    maritalStatus: yup.string().required(reqMsg('marital status')),
    dependants: yup.string().required('Please enter number of dependants'),
    adultsInHousehold: yup
      .string()
      .required('Please enter adults in household'),
    consent: yup.boolean().notRequired(),
    termsAndCons: yup
      .boolean()
      .oneOf([true], 'The terms and conditions must be accepted.'),
  },
  [
    ['dayOfBirth', 'monthOfBirth'],
    ['dayOfBirth', 'yearOfBirth'],
    ['monthOfBirth', 'yearOfBirth'],
  ],
);

export default ValidationSchema;
