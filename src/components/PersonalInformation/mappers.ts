import { IPersonInformationFormValues } from './interface';
import { MyAccount_myAccountDetailsByPersonUuid as IPerson } from '../../../generated/MyAccount';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person: IPerson | null,
): IPersonInformationFormValues => {
  return {
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    telephoneNumber: person?.telephoneNumber || '',
    emailAddress: person?.emailAddress || '',
    emailConsent: !!person?.emailConsent,
    smsConsent: !!person?.emailConsent,
  };
};
