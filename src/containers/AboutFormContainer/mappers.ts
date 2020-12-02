/* eslint-disable @typescript-eslint/camelcase */
import moment from 'moment';
import { PersonInputObject } from '../../../generated/globalTypes';
import { IAboutFormValues } from '../../components/AboutForm/interface';
import { RegisterForTemporaryAccess_registerForTemporaryAccess_emailAddress as IEmailAddress } from '../../../generated/RegisterForTemporaryAccess';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IAboutFormValues,
  emailAddress?: IEmailAddress | null,
): PersonInputObject => {
  const dateOfBirth = moment(
    `${values.dayOfBirth}-${values.monthOfBirth}-${values.yearOfBirth}`,
    'DD-MM-YYYY',
  ).format('YYYY-MM-DD');

  return {
    title: values.title,
    firstName: values.firstName,
    lastName: values.lastName,
    emailAddress: {
      kind: 'Home',
      value: values.email,
      primary: true,
      uuid: emailAddress?.uuid,
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
  };
};
