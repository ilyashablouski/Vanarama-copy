import { FormikErrors } from 'formik';
import * as Yup from 'yup';
import { GetDirectorDetailsQuery_companyOfficers_nodes as DirectorFieldsOfficer } from '../../../generated/GetDirectorDetailsQuery';
import { sum } from '../../utils/array';
import { checkFuture } from '../../utils/validation';
import { DirectorDetailsFormValues, DirectorFormValues } from './interfaces';

export const initialFormValues = (
  directors: DirectorFieldsOfficer[],
): DirectorDetailsFormValues => {
  if (directors.length > 1) {
    return { totalPercentage: 0, directors: [] };
  }

  const [lastName, firstName] = directors[0].name.split(', ');
  return {
    totalPercentage: 0,
    directors: [
      {
        title: '',
        firstName,
        lastName,
        gender: '',
        shareOfBusiness: '',
        dayOfBirth: '',
        monthOfBirth: '',
        yearOfBirth: '',
        numberOfDependants: '',
        history: [],
      },
    ],
  };
};

export const validate = (
  values: DirectorDetailsFormValues,
): FormikErrors<DirectorDetailsFormValues> => {
  const errors: FormikErrors<DirectorDetailsFormValues> = {};

  const totalPercentage = sum(values.directors, _ => Number(_.shareOfBusiness));
  if (totalPercentage < 25) {
    errors.totalPercentage = 'TOO_LOW';
  } else if (totalPercentage > 100) {
    errors.totalPercentage = 'TOO_HIGH';
  }

  return errors;
};

export const validationSchema = Yup.object().shape({
  directors: Yup.array()
    .of(
      Yup.object().shape({
        fullname: Yup.string().when(['firstName', 'lastName'], {
          is: (firstName: string, lastName: string) => !firstName || !lastName,
          then: Yup.string().required('Please select a director'),
        }),
        title: Yup.string().required('Please select a title'),
        firstName: Yup.string().required('Please enter a first name'),
        lastName: Yup.string().required('Please enter a last name'),
        gender: Yup.string().required('Please select a gender'),
        shareOfBusiness: Yup.string().required(
          'Please enter the share of business',
        ),
        dayOfBirth: Yup.string().required('Please select a date of birth'),
        monthOfBirth: Yup.string().required('Please select a date of birth'),
        yearOfBirth: Yup.string().required('Please select a date of birth'),
        numberOfDependants: Yup.string().required(
          'Please enter a number of dependants',
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
      }),
    )
    .required(),
});

export function createKeyGenerator(index: number) {
  return (field: keyof DirectorFormValues) => `directors[${index}].${field}`;
}
