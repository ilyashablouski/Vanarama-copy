import { IPersonInformationFormValues } from '../../components/PersonalInformation/interface';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IPersonInformationFormValues,
  personUuid: string,
  serviceId: string | undefined,
) => {
  return {
    personUuid: personUuid || '',
    firstName: values.firstName,
    lastName: values.lastName,
    telephoneNumber: values.telephoneNumber,
    serviceId,
    emailConsent: values.emailConsent,
    smsConsent: values.emailConsent,
  };
};
