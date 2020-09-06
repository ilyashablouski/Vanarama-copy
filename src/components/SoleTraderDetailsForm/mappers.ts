import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import { ISoleTraderDetailsFormValues } from './interfaces';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person?: AboutFormPerson | null,
): ISoleTraderDetailsFormValues => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';
  const dateOfBirth = person?.dateOfBirth && new Date(person.dateOfBirth);

  return {
    adultsInHousehold: person?.noOfAdultsInHousehold || '',
    placeOfBirth: person?.placeOfBirth || '',
    dependants: person?.noOfDependants || '',
    email,
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    maritalStatus: person?.maritalStatus || '',
    nationality: person?.nationality || '',
    title: person?.title || '',
    dayOfBirth: dateOfBirth ? String(dateOfBirth.getDate()) : '',
    monthOfBirth: dateOfBirth ? String(dateOfBirth.getMonth() + 1) : '',
    yearOfBirth: dateOfBirth ? String(dateOfBirth.getFullYear()) : '',
  };
};
