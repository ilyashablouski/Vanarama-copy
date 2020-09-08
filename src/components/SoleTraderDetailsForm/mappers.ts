import { SoleTraderPerson_associates as SoleTrader } from '../../../generated/SoleTraderPerson';
import { SoleTraderDetailsFormAddresses } from '../../../generated/SoleTraderDetailsFormAddresses';
import { ISoleTraderDetailsFormValues } from './interfaces';
import { addressToDisplay } from '../../utils/address';

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person?: SoleTrader | null,
  addresses?: SoleTraderDetailsFormAddresses[],
): ISoleTraderDetailsFormValues => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';
  const dateOfBirth = person?.dateOfBirth && new Date(person.dateOfBirth);

  return {
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    gender: '',
    placeOfBirth: person?.countryOfBirth || '',
    dependants: person?.noOfDependants || '',
    email,
    maritalStatus: person?.maritalStatus || '',
    nationality: person?.nationality || '',
    title: person?.title || '',
    dayOfBirth: dateOfBirth ? String(dateOfBirth.getDate()) : '',
    monthOfBirth: dateOfBirth ? String(dateOfBirth.getMonth() + 1) : '',
    yearOfBirth: dateOfBirth ? String(dateOfBirth.getFullYear()) : '',
    adultsInHousehold: person?.noOfAdultsInHousehold || '',
    occupation: person?.occupation || '',
    avgMonthlyIncome: person?.incomeAndExpense?.averageMonthlyIncome || '',
    annualIncome: person?.incomeAndExpense?.annualIncome || '',
    monthlyMortgagePayments: person?.incomeAndExpense?.mortgageOrRent || '',
    monthlyStudentPayments: person?.incomeAndExpense?.studentLoan || '',
    monthlyIncomeChange:
      person?.incomeAndExpense?.anticipateMonthlyIncomeChange || false,
    futureMonthlyIncome: person?.incomeAndExpense?.futureMonthlyIncome || '',
    history: [...addresses]
      .sort(
        (a, b) =>
          new Date(b.startedOn).getTime() - new Date(a.startedOn).getTime(),
      )
      .map(address => {
        const movedIn = new Date(address.startedOn);
        return {
          status: address.propertyStatus || '',
          month: String(movedIn.getMonth() + 1),
          year: String(movedIn.getFullYear()),
          address: address.serviceId
            ? {
                id: address.serviceId,
                label: addressToDisplay(address),
              }
            : undefined,
        };
      }),
  };
};
