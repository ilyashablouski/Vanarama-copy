import { IPersonInformationFormValues } from './interface';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person: any,
): IPersonInformationFormValues => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';
  const mobile =
    person?.telephoneNumbers?.find(_ => _.kind === 'Mobile')?.value || '';

  return {
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    address: person?.address || '',
    mobile,
    email,
  };
};
