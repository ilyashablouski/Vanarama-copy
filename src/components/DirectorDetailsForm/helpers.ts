import { FormikErrors } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { GetDirectorDetailsQuery_companyOfficers_nodes as DirectorFieldsOfficer } from '../../../generated/GetDirectorDetailsQuery';
import { sum } from '../../utils/array';
import { dateOfBirthValidator, checkFuture } from '../../utils/validation';
import { DirectorDetailsFormValues, DirectorFormValues } from './interfaces';
import { CompanyAssociate } from '../../../generated/CompanyAssociate';
import { TAddressEntry } from '../AddressForm/interfaces';
import { addressToDisplay } from '../../utils/address';

export const initialFormValues = (
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
    if (selected)
      return {
        directors: [selected],
        totalPercentage,
      };
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
      lastName,
      gender: '',
      shareOfBusiness: '',
      dayOfBirth: '',
      monthOfBirth: '',
      yearOfBirth: '',
      numberOfDependants: '',
      history: [],
    };
  });
};

export const parseAssociates = (
  associates: CompanyAssociate[],
): DirectorFormValues[] =>
  associates.map(a => {
    const dateOfBirth = moment(a.dateOfBirth);
    const history: TAddressEntry[] =
      a.addresses?.map(address => {
        const startedOn = moment(address.startedOn);
        return {
          address: {
            id: address.serviceId || '',
            label: addressToDisplay(address),
          },
          month: (startedOn.month() + 1).toString() || '',
          status: address.propertyStatus || '',
          year: startedOn.year().toString() || '',
        };
      }) || [];
    return {
      uuid: a.uuid,
      title: a.title || '',
      firstName: a.firstName || '',
      lastName: a.lastName || '',
      gender: a.gender || '',
      shareOfBusiness: `${a.businessShare}` || '',
      dayOfBirth: (dateOfBirth.day() + 1).toString() || '',
      monthOfBirth: (dateOfBirth.month() + 1).toString() || '',
      yearOfBirth: dateOfBirth.year().toString() || '',
      numberOfDependants: a.noOfDependants || '',
      history,
    };
  });

export const combineDirectorsData = (
  officers: DirectorFieldsOfficer[],
  associates: CompanyAssociate[],
) => {
  const editedDirecors: DirectorFormValues[] = parseAssociates(associates);
  const notEditedDirecors = parseOfficers(officers).filter(
    officer =>
      editedDirecors.filter(
        a =>
          a.firstName === officer.firstName && a.lastName === officer.lastName,
      ).length === 0,
  );
  return editedDirecors.concat(notEditedDirecors);
};
