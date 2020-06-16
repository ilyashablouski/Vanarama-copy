import {
  IPersonInformationFormValues,
  IPropsPersonFormValues,
} from '../../components/PersonalInformation/interface';

// eslint-disable-next-line import/prefer-default-export
export const formValuesToInput = (
  values: IPersonInformationFormValues,
  person: IPropsPersonFormValues,
  serviceId: string | undefined,
) => {
  return {
    personUuid: person.personUuid,
    firstName: values.firstName,
    lastName: values.lastName,
    telephoneNumber: values.telephoneNumber,
    serviceId,
  };
};
