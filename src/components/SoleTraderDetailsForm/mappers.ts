import moment from 'moment';
import { SoleTraderAssociate_associates as SoleTrader } from '../../../generated/SoleTraderAssociate';
import { SoleTraderPerson as Person } from '../../../generated/SoleTraderPerson';
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
  person: Person | null | undefined,
  soleTrader: SoleTrader | null | undefined,
): ISoleTraderDetailsFormValues => {
  const st: any = soleTrader || person;
  const email = person?.emailAddresses.find(addr => addr.primary)?.value || '';
  const dateOfBirth = st?.dateOfBirth && new Date(st.dateOfBirth);
  const addresses = st?.addresses || [];

  return {
    firstName: st?.firstName || '',
    lastName: st?.lastName || '',
    gender: st?.gender || '',
    placeOfBirth: st?.countryOfBirth || '',
    dependants: st?.noOfDependants || '',
    email,
    maritalStatus: st?.maritalStatus || '',
    nationality: st?.nationality || '',
    title: st?.title || '',
    dayOfBirth: dateOfBirth ? String(dateOfBirth.getDate()) : '',
    monthOfBirth: dateOfBirth ? String(dateOfBirth.getMonth() + 1) : '',
    yearOfBirth: dateOfBirth ? String(dateOfBirth.getFullYear()) : '',
    adultsInHousehold: st?.noOfAdultsInHousehold || '',
    occupation: st?.occupation || '',
    avgMonthlyIncome: st?.incomeAndExpense?.averageMonthlyIncome || 0,
    annualIncome: st?.incomeAndExpense?.annualIncome || 0,
    monthlyMortgagePayments: st?.incomeAndExpense?.mortgageOrRent || 0,
    monthlyStudentPayments: st?.incomeAndExpense?.studentLoan || 0,
    monthlyIncomeChange:
      st?.incomeAndExpense?.anticipateMonthlyIncomeChange || false,
    futureMonthlyIncome: st?.incomeAndExpense?.futureMonthlyIncome || 0,
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
