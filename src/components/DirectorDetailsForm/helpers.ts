import { FormikErrors } from 'formik';
import * as Yup from 'yup';
import { GetDirectorDetailsQuery_companyOfficers_nodes as DirectorFieldsOfficer } from '../../../generated/GetDirectorDetailsQuery';
import { sum } from '../../utils/array';
import { dateOfBirthValidator, checkFuture } from '../../utils/validation';
import { DirectorDetailsFormValues, DirectorFormValues } from './interfaces';

export const initialEditedFormValues = (
  directors: DirectorFormValues[],
  directorUuid?: string,
): DirectorDetailsFormValues => {
  if (directors.length === 1) {
    return {
      directors,
      totalPercentage: parseInt(directors[0].shareOfBusiness, 10),
    };
  }
  const totalPercentage = directors.reduce(
    (prev, curr) => prev + (parseInt(curr.shareOfBusiness, 10) || 0),
    0,
  );

  if (directorUuid) {
    const selected = directors.find(d => d.uuid === directorUuid);

    if (selected) {
      return {
        directors: [selected],
        totalPercentage,
      };
    }
  }
  return {
    directors: [],
    totalPercentage,
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
  directors: Yup.array()
    .of(
      Yup.object().shape(
        {
          fullname: Yup.string().when(['firstName', 'lastName'], {
            is: (firstName: string, lastName: string) =>
              !firstName || !lastName,
            then: Yup.string().required('Please select a director'),
          }),
          title: Yup.string().required('Please select a title'),
          firstName: nameType.required('Please enter a first name'),
          lastName: nameType.required('Please enter a last name'),
          gender: Yup.string().required('Please select a gender'),
          email: Yup.string()
            .required('Please enter the email')
            .max(
              254,
              'Oops, this email is too long. Please keep it to 254 characters',
            )
            .email('Oops, this email address is invalid'),
          shareOfBusiness: Yup.string().required(
            'Please enter the share of business',
          ),
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

export function createKeyGenerator(index: number) {
  return (field: keyof DirectorFormValues) => `directors[${index}].${field}`;
}

export const parseOfficers = (
  officers: DirectorFieldsOfficer[],
): DirectorFormValues[] => {
  return officers.map(officer => {
    const [lastName, firstName] = officer.name.split(', ');
    return {
      title: '',
      firstName,
      originalFirstName: firstName,
      lastName,
      originalLastName: lastName,
      gender: '',
      email: '',
      shareOfBusiness: '',
      dayOfBirth: '',
      monthOfBirth: '',
      yearOfBirth: '',
      numberOfDependants: '',
      history: [],
    };
  });
};

export const combineDirectorsData = (
  officers: DirectorFormValues[],
  directors?: DirectorFormValues[] | null,
) => {
  return officers.map(officer => {
    const data = directors?.find(
      director =>
        officer.firstName === director.originalFirstName &&
        officer.lastName === director.originalLastName,
    );
    return {
      ...officer,
      ...(data || {}),
    };
  });
};

export const initialFormValues = (
  directors: DirectorFormValues[],
): DirectorDetailsFormValues => {
  if (directors.length > 1) {
    return { totalPercentage: 0, directors: [] };
  }

  return {
    totalPercentage: 0,
    directors: [directors[0]],
  };
};
