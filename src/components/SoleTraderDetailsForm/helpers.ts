/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';
import { dateOfBirthValidator, checkFuture } from '../../utils/validation';

const nameType = Yup.string()
  .min(2, 'Oops, this name’s too short. Please make it 2 characters or more.')
  .max(
    50,
    'Oops, this name’s too long. Please keep it to 50 characters or less.',
  )
  .matches(
    /^^[a-zA-Z'-\s]+$/,
    'Please use only letters, apostrophes and dashes.',
  );

export const validationSchema = Yup.object().shape(
  {
    title: Yup.string().required('Please select a title'),
    firstName: nameType.required('Please enter a first name'),
    lastName: nameType.required('Please enter a last name'),
    gender: Yup.string().required('Please select a gender'),
    placeOfBirth: Yup.string().required('Please select your place of birth'),
    maritalStatus: Yup.string().required('Please enter your marital status'),
    nationality: Yup.string().required('Please enter your nationality'),
    dayOfBirth: Yup.string()
      .required('Please select a date of birth')
      .when(['monthOfBirth', 'yearOfBirth'], {
        is: (monthOfBirth, yearOfBirth) => Boolean(monthOfBirth && yearOfBirth),
        then: Yup.string().test('age', 'Invalid age', dateOfBirthValidator),
      }),
    monthOfBirth: Yup.string()
      .required('Please select a date of birth')
      .when(['dayOfBirth', 'yearOfBirth'], {
        is: (dayOfBirth, yearOfBirth) => Boolean(dayOfBirth && yearOfBirth),
        then: Yup.string().test('age', 'Invalid age', dateOfBirthValidator),
      }),
    yearOfBirth: Yup.string()
      .required('Please select a date of birth')
      .when(['dayOfBirth', 'monthOfBirth'], {
        is: (dayOfBirth, monthOfBirth) => Boolean(dayOfBirth && monthOfBirth),
        then: Yup.string().test('age', 'Invalid age', dateOfBirthValidator),
      }),
    adultsInHousehold: Yup.string().required('Please enter a number of adults'),
    dependants: Yup.string().required('Please enter a number of dependants'),
    occupation: Yup.string().required(
      'Please search for your job title & select from the list',
    ),
    history: Yup.array().of(
      Yup.object().shape({
        address: Yup.object().required('Please enter your address'),
        status: Yup.string().required('Please select your property status'),
        month: Yup.string()
          .required('Please select a move in date')
          .test(
            'max',
            'Oops, the date moved in cannot be in the future',
            checkFuture,
          ),
        year: Yup.string()
          .required('Please select a move in date')
          .test(
            'max',
            'Oops, the date moved in cannot be in the future',
            checkFuture,
          ),
      }),
    ),
    annualIncome: Yup.number().required('Please enter your annual income'),
    avgMonthlyIncome: Yup.number().required(
      'Please enter your average monthly income',
    ),
    monthlyMortgagePayments: Yup.number().required(
      'Please enter your monthly mortgage/rent payments',
    ),
    monthlyStudentPayments: Yup.number().required(
      'Please enter your student loan payments',
    ),
    monthlyIncomeChange: Yup.boolean().notRequired(),
    futureMonthlyIncome: Yup.number().when('monthlyIncomeChange', {
      is: true,
      then: Yup.number().required('Please enter your future monthly income'),
    }),
    suitabilityConsent: Yup.boolean().oneOf(
      [true],
      'You must accept to proceed',
    ),
  },
  [
    ['dayOfBirth', 'monthOfBirth'],
    ['dayOfBirth', 'yearOfBirth'],
    ['monthOfBirth', 'yearOfBirth'],
  ],
);
