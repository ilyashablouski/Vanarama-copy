import moment from 'moment';
import { SoleTraderPerson_associates as SoleTrader } from '../../../generated/SoleTraderPerson';
import { SoleTraderDetailsFormAddresses } from '../../../generated/SoleTraderDetailsFormAddresses';
import { CompanyAssociateInputObject } from '../../../generated/globalTypes';
import { ISoleTraderDetailsFormValues } from './interfaces';
import { addressToDisplay } from '../../utils/address';

export const formValuesToInput = (
  values: ISoleTraderDetailsFormValues,
): CompanyAssociateInputObject => {
  const dateOfBirth = moment(
    `${values.dayOfBirth}-${values.monthOfBirth}-${values.yearOfBirth}`,
    'DD-MM-YYYY',
  ).format('YYYY-MM-DD');

  return {
    title: values.title,
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    emailAddress: { kind: 'Home', value: values.email, primary: true },
    dateOfBirth,
    countryOfBirth: values.placeOfBirth,
    nationality: values.nationality,
    maritalStatus: values.maritalStatus,
    noOfDependants: values.dependants,
    noOfAdultsInHousehold: values.adultsInHousehold,
    occupation: values.occupation,
    incomeAndExpense: {
      annualIncome: values.annualIncome,
      averageMonthlyIncome: values.avgMonthlyIncome,
      mortgageOrRent: values.monthlyMortgagePayments,
      studentLoan: values.monthlyStudentPayments,
      futureMonthlyIncome: values.futureMonthlyIncome,
    },
  };
};

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
    avgMonthlyIncome: person?.incomeAndExpense?.averageMonthlyIncome || 0,
    annualIncome: person?.incomeAndExpense?.annualIncome || 0,
    monthlyMortgagePayments: person?.incomeAndExpense?.mortgageOrRent || 0,
    monthlyStudentPayments: person?.incomeAndExpense?.studentLoan || 0,
    monthlyIncomeChange:
      person?.incomeAndExpense?.anticipateMonthlyIncomeChange || false,
    futureMonthlyIncome: person?.incomeAndExpense?.futureMonthlyIncome || 0,
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
