import { IPersonInformationFormValues } from '../../components/PersonalInformation/interface';
import { MyAccount_myAccountDetailsByPersonUuid as IPerson } from '../../../generated/MyAccount';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IPersonInformationFormValues,
  person: IPerson | null | undefined,
  serviceId: string | undefined,
) => {
  return {
    personUuid: person?.personUuid || '',
    firstName: values.firstName,
    lastName: values.lastName,
    telephoneNumber: values.telephoneNumber,
    serviceId,
    emailConsent: values.emailConsent,
    smsConsent: values.emailConsent,
  };
};
