import moment from 'moment';
import { SoleTraderAssociate_associates as SoleTrader } from '../../../generated/SoleTraderAssociate';
import { SoleTraderPerson as Person } from '../../../generated/SoleTraderPerson';
import { SoleTraderDetailsFormAddresses } from '../../../generated/SoleTraderDetailsFormAddresses';
import { CompanyAssociateInputObject } from '../../../generated/globalTypes';
import { ISoleTraderDetailsFormValues } from './interfaces';
import { addressToDisplay } from '../../utils/address';
import { historyToMoment } from '../../utils/dates';

export const formValuesToAssociate = (
  values: ISoleTraderDetailsFormValues,
  personUuid: string,
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
    // emailAddress: { kind: 'Home', value: values.email, primary: true },
    dateOfBirth,
    countryOfBirth: values.placeOfBirth,
    nationality: values.nationality,
    maritalStatus: values.maritalStatus,
    noOfDependants: values.dependants,
    noOfAdultsInHousehold: values.adultsInHousehold,
    occupation: values.occupation,
    addresses: values.history.map(item => ({
      serviceId: item.address?.id,
      propertyStatus: item.status,
      startedOn: historyToMoment(item).format('YYYY-MM-DD'),
    })),
    incomeAndExpense: {
      annualIncome: Number(values.annualIncome),
      averageMonthlyIncome: Number(values.avgMonthlyIncome),
      mortgageOrRent: Number(values.monthlyMortgagePayments),
      studentLoan: Number(values.monthlyStudentPayments),
      anticipateMonthlyIncomeChange: Boolean(values.monthlyIncomeChange),
      futureMonthlyIncome: Number(values.futureMonthlyIncome),
    },
    uuid: personUuid,
  };
};

// eslint-disable-next-line import/prefer-default-export
export const responseToInitialFormValues = (
  person?: Person | null,
  soleTrader?: SoleTrader | null,
  addresses?: SoleTraderDetailsFormAddresses[],
): ISoleTraderDetailsFormValues => {
  const email = person?.emailAddresses.find(_ => _.primary)?.value || '';
  const dateOfBirth = person?.dateOfBirth && new Date(person.dateOfBirth);

  return {
    firstName: person?.firstName || '',
    lastName: person?.lastName || '',
    gender: person?.gender || '',
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
    occupation: soleTrader?.occupation || '',
    avgMonthlyIncome: soleTrader?.incomeAndExpense?.averageMonthlyIncome || 0,
    annualIncome: soleTrader?.incomeAndExpense?.annualIncome || 0,
    monthlyMortgagePayments: soleTrader?.incomeAndExpense?.mortgageOrRent || 0,
    monthlyStudentPayments: soleTrader?.incomeAndExpense?.studentLoan || 0,
    monthlyIncomeChange:
      soleTrader?.incomeAndExpense?.anticipateMonthlyIncomeChange || false,
    futureMonthlyIncome: soleTrader?.incomeAndExpense?.futureMonthlyIncome || 0,
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
