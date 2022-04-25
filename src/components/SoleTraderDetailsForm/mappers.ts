import { SoleTraderAssociate_associates as SoleTrader } from '../../../generated/SoleTraderAssociate';
import { SoleTraderPerson as Person } from '../../../generated/SoleTraderPerson';
import { CompanyAssociateInputObject } from '../../../generated/globalTypes';
import { ISoleTraderDetailsFormValues } from './interfaces';
import { parseDate } from '../../utils/dates';
import { mapAddress } from '../../containers/CompanyDetailsFormContainer/mappers';

export const formValuesToAssociate = (
  values: ISoleTraderDetailsFormValues,
  personUuid: string,
): CompanyAssociateInputObject => {
  return {
    title: values.title,
    firstName: values.firstName,
    lastName: values.lastName,
    gender: values.gender,
    dateOfBirth: parseDate(
      values.dayOfBirth,
      values.monthOfBirth,
      values.yearOfBirth,
    ),
    countryOfBirth: values.placeOfBirth,
    nationality: values.nationality,
    maritalStatus: values.maritalStatus,
    noOfDependants: values.dependants,
    noOfAdultsInHousehold: values.adultsInHousehold,
    occupation: values.occupation,
    addresses: values.history.map(item => ({
      ...(item.address ?? {}),
      id: undefined,
      label: undefined,
      serviceId: item.address?.id,
      propertyStatus: item.status,
      startedOn: parseDate('01', item.month, item.year),
    })),
    incomeAndExpense: {
      annualIncome: Number(values.annualIncome),
      averageMonthlyIncome: Number(values.avgMonthlyIncome),
      mortgageOrRent: Number(values.monthlyMortgagePayments),
      studentLoan: Number(values.monthlyStudentPayments),
      anticipateMonthlyIncomeChange: Boolean(values.monthlyIncomeChange),
      futureMonthlyIncome: Number(values.futureMonthlyIncome),
      suitabilityConsent: !!values.suitabilityConsent,
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
  const dateOfBirth = st?.dateOfBirth && new Date(st.dateOfBirth);
  const addresses = st?.addresses || [];

  return {
    firstName: st?.firstName || '',
    lastName: st?.lastName || '',
    gender: st?.gender || '',
    placeOfBirth: st?.countryOfBirth || '',
    dependants: st?.noOfDependants || '',
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
    suitabilityConsent: st?.incomeAndExpense?.suitabilityConsent || false,
    history: [...addresses]
      .sort(
        (firstAddress, secondAddress) =>
          new Date(secondAddress.startedOn).getTime() -
          new Date(firstAddress.startedOn).getTime(),
      )
      .map(address => {
        const movedIn = new Date(address.startedOn);
        const mappedAddress = mapAddress(address);

        return {
          status: address.propertyStatus || '',
          month: String(movedIn.getMonth() + 1),
          year: String(movedIn.getFullYear()),
          address: mappedAddress?.label ? mappedAddress : undefined,
        };
      }),
  };
};
