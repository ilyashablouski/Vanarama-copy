import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import { IAboutFormValues } from './interface';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person?: AboutFormPerson | null,
): IAboutFormValues => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';
  const dateOfBirth = person?.dateOfBirth && new Date(person.dateOfBirth);

  const telephone =
    person?.telephoneNumbers?.find(_ => _.kind === 'Mobile')?.value || '';

  return {
    telephone,
    adultsInHousehold: person?.noOfAdultsInHousehold || '',
    countryOfBirth: person?.countryOfBirth || '',
    dependants: person?.noOfDependants || '',
    email,
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    maritalStatus: person?.maritalStatus || '',
    nationality: person?.nationality || '',
    termsAndCons: Boolean(person),
    title: person?.title || '',
    consent: person?.emailConsent || false,
    dayOfBirth: dateOfBirth ? String(dateOfBirth.getDate()) : '',
    monthOfBirth: dateOfBirth ? String(dateOfBirth.getMonth() + 1) : '',
    yearOfBirth: dateOfBirth ? String(dateOfBirth.getFullYear()) : '',
    termsAndConditions: !!person?.termsAndConditions,
    marketing: !!person?.smsConsent,
    companyType: person?.companies?.length
      ? person.companies[0].companyType || ''
      : '',
    privacyPolicy: !!person?.privacyPolicy,
  };
};
