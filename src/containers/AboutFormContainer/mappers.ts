import moment from 'moment';
import { PersonInputObject } from '../../../generated/globalTypes';
import { IAboutFormValues } from '../../components/AboutForm/interface';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IAboutFormValues,
): PersonInputObject => {
  const dateOfBirth = moment(
    `${values.dayOfBirth}-${values.monthOfBirth}-${values.yearOfBirth}`,
    'DD-MM-YYYY',
  ).format('YYYY-MM-DD');

  return {
    title: values.title,
    firstName: values.firstName,
    lastName: values.lastName,
    emailAddress: { kind: 'Home', value: values.email, primary: true },
    telephoneNumbers: [{ kind: 'Mobile', value: values.mobile, primary: true }],
    dateOfBirth,
    countryOfBirth: values.countryOfBirth,
    nationality: values.nationality,
    maritalStatus: values.maritalStatus,
    noOfDependants: values.dependants,
    noOfAdultsInHousehold: values.adultsInHousehold,
    emailConsent: values.consent,
    smsConsent: values.consent,
  };
};
