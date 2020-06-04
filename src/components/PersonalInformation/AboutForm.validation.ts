import * as yup from 'yup';
import moment from 'moment';
import { IAboutFormValues } from './interface';
import { WORLDWIDE_MOBILE_REGEX } from '../../utils/regex';

const reqMsg = (rel: string) => `Please enter your ${rel}`;

function isAgeValid({
  dayOfBirth,
  monthOfBirth,
  yearOfBirth,
}: IAboutFormValues) {
  const dateStr = `${dayOfBirth}-${monthOfBirth}-${yearOfBirth}`;
  const validMinAge =
    moment().diff(moment(dateStr, 'DD-MM-YYYY'), 'years') >= 18;
  const validMaxAge =
    moment().diff(moment(dateStr, 'DD-MM-YYYY'), 'years') <= 120;

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

const ValidationSchema = yup.object().shape<IAboutFormValues>(
  {
    title: yup.string().required('Please select a title'),
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
    mobile: yup
      .string()
      .required(reqMsg('mobile number'))
      .max(
        16,
        'Oops, this mobile number is too long. Please enter 16 characters or less',
      )
      .matches(
        WORLDWIDE_MOBILE_REGEX,
        'Please enter mobile number without spaces or hyphens',
      ),
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
