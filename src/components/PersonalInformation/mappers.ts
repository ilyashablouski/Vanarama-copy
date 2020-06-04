import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import { IPersonalInformationValues } from './interface';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person?: AboutFormPerson | null,
): IPersonalInformationValues => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';

  const mobile =
    person?.telephoneNumbers?.find(_ => _.kind === 'Mobile')?.value || '';

  return {
    mobile,
    email,
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    consent: person?.emailConsent || false,
  };
};
