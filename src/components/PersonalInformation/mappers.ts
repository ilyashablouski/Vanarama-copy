import {
  IPersonInformationFormValues,
  IPropsPersonFormValues,
} from './interface';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person: IPropsPersonFormValues,
): IPersonInformationFormValues => {
  return {
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    telephoneNumber: person.telephoneNumber,
    emailAddress: person.emailAddress,
  };
};
