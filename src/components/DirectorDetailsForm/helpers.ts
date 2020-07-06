import * as Yup from 'yup';
import { useFormikContext, FormikErrors } from 'formik';
import { useCallback, useEffect } from 'react';
import { DirectorFormValues, DirectorDetailsFormValues } from './interfaces';
import { checkFuture } from '../../utils/validation';
import { DirectorFieldsOfficer } from '../../../generated/DirectorFieldsOfficer';
import { sum } from '../../utils/array';

export const initialValues: DirectorDetailsFormValues = {
  totalPercentage: 0,
  directors: [
    {
      fullname: '',
      title: '',
      firstName: '',
      lastName: '',
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

export const initialValuesWithSingleDirector = (
  director: DirectorFieldsOfficer,
): DirectorDetailsFormValues => {
  const [lastName, firstName] = director.name.split(', ');
  return {
    totalPercentage: 0,
    directors: [
      {
        fullname: '',
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
  const totalPercentage = sum(values.directors, _ => Number(_.shareOfBusiness));
  return {
    totalPercentage: totalPercentage < 25 ? 'Too low baby!' : undefined,
  };
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

export function usePrepopulateName(
  selectedDirectorFullname: string,
  index: number,
) {
  const { setFieldValue } = useFormikContext<DirectorDetailsFormValues>();
  const generateFieldKey = useCallback(createKeyGenerator(index), [index]);

  useEffect(() => {
    if (selectedDirectorFullname) {
      const [lastName, firstName] = selectedDirectorFullname.split(', ');
      setFieldValue(generateFieldKey('firstName'), firstName);
      setFieldValue(generateFieldKey('lastName'), lastName);
    }
  }, [selectedDirectorFullname, generateFieldKey, setFieldValue]);
}
