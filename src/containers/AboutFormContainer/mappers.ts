/* eslint-disable @typescript-eslint/camelcase */
import moment from 'moment';
import { PersonInputObject } from '../../../generated/globalTypes';
import { IAboutFormValues } from '../../components/AboutForm/interface';
import { RegisterForTemporaryAccess_registerForTemporaryAccess as IRegistrationResult } from '../../../generated/RegisterForTemporaryAccess';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IAboutFormValues,
  data?: IRegistrationResult | null,
): PersonInputObject => {
  const dateOfBirth = moment(
    `${values.dayOfBirth}-${values.monthOfBirth}-${values.yearOfBirth}`,
    'DD-MM-YYYY',
  ).format('YYYY-MM-DD');

  return {
    uuid: data?.uuid,
    title: values.title,
    firstName: values.firstName,
    lastName: values.lastName,
    emailAddress: {
      kind: 'Home',
      value: values.email,
      primary: true,
      uuid: data?.emailAddress?.uuid,
    },
    telephoneNumbers: [
      { kind: 'Mobile', value: values.telephone, primary: true },
    ],
    dateOfBirth,
    countryOfBirth: values.countryOfBirth,
    nationality: values.nationality,
    maritalStatus: values.maritalStatus,
    noOfDependants: values.dependants,
    noOfAdultsInHousehold: values.adultsInHousehold,
    emailConsent: values.consent,
    smsConsent: values.consent,
    privacyPolicy: values.privacyPolicy,
  };
};
