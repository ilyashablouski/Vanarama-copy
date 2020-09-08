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

export const validationSchema = Yup.object().shape({
  soleTrader: Yup.array()
    .of(
      Yup.object().shape(
        {
          title: Yup.string().required('Please select a title'),
          firstName: nameType.required('Please enter a first name'),
          lastName: nameType.required('Please enter a last name'),
          gender: Yup.string().required('Please select a gender'),
          dayOfBirth: Yup.string()
            .required('Please select a date of birth')
            .when(['monthOfBirth', 'yearOfBirth'], {
              is: (monthOfBirth, yearOfBirth) =>
                Boolean(monthOfBirth && yearOfBirth),
              then: Yup.string().test(
                'age',
                'Invalid age',
                dateOfBirthValidator,
              ),
            }),
          monthOfBirth: Yup.string()
            .required('Please select a date of birth')
            .when(['dayOfBirth', 'yearOfBirth'], {
              is: (dayOfBirth, yearOfBirth) =>
                Boolean(dayOfBirth && yearOfBirth),
              then: Yup.string().test(
                'age',
                'Invalid age',
                dateOfBirthValidator,
              ),
            }),
          yearOfBirth: Yup.string()
            .required('Please select a date of birth')
            .when(['dayOfBirth', 'monthOfBirth'], {
              is: (dayOfBirth, monthOfBirth) =>
                Boolean(dayOfBirth && monthOfBirth),
              then: Yup.string().test(
                'age',
                'Invalid age',
                dateOfBirthValidator,
              ),
            }),
          numberOfDependants: Yup.string().required(
            'Please enter a number of dependants',
          ),
          history: Yup.array().of(
            Yup.object().shape({
              address: Yup.object().required('Please enter your address'),
              status: Yup.string().required(
                'Please select your property status',
              ),
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
        },
        [
          ['dayOfBirth', 'monthOfBirth'],
          ['dayOfBirth', 'yearOfBirth'],
          ['monthOfBirth', 'yearOfBirth'],
        ],
      ),
    )
    .required(),
});
