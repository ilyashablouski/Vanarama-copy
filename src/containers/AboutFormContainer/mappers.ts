import { PersonInputObject } from '../../../generated/globalTypes';
import { IAboutFormValues } from '../../components/AboutForm/interface';
import { RegisterForTemporaryAccess_registerForTemporaryAccess as IRegistrationResult } from '../../../generated/RegisterForTemporaryAccess';
import { parseDate } from '../../utils/dates';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IAboutFormValues,
  data?: IRegistrationResult | null,
): PersonInputObject => {
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
    dateOfBirth: parseDate(
      values.dayOfBirth,
      values.monthOfBirth,
      values.yearOfBirth,
    ),
    countryOfBirth: values.countryOfBirth,
    nationality: values.nationality,
    maritalStatus: values.maritalStatus,
    noOfDependants: values.dependants,
    noOfAdultsInHousehold: values.adultsInHousehold,
    emailConsent: values.consent,
    smsConsent: values.consent,
    privacyPolicy: values.privacyPolicy,
    termsAndConditions: values.termsAndCons,
  };
};
