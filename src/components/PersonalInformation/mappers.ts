import { IPersonInformationFormValues } from './interface';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person: any,
): IPersonInformationFormValues => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';
  const mobile = person?.telephoneNumbers.find(_ => _.primary)?.value || '';

  return {
    firstName: person?.person?.firstName || '',
    lastName: person?.person?.lastName || '',
    address: person?.person?.address || '',
    mobile,
    email,
  };
};
