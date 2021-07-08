import { ISoleTraderCompanyDetailsFormValues } from '../../components/SoleTraderCompanyDetailsForm/interfaces';
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import { UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany as Company } from '../../../generated/UpdateSoleTraderCompanyMutation';
import { parseDate } from '../../utils/dates';

export const mapFormValues = (values: ISoleTraderCompanyDetailsFormValues) => {
  return {
    addresses: [
      {
        ...(values.tradingAddress ?? {}),
        label: undefined,
        id: undefined,
        serviceId: values.tradingAddress?.id,
        kind: 'Trading',
      },
    ],
    emailAddress: {
      value: values.email,
      kind: 'Home',
    },
    telephoneNumbers: [
      {
        value: values.businessTelephoneNumber,
        kind: 'Mobile',
      },
    ],
    tradingName: values.tradingName,
    monthlyAmountBeingReplaced: parseFloat(values.monthlyAmountBeingReplaced),
    annualTurnover: parseFloat(values.annualTurnover),
    companyNature: values.nature,
    annualSalesCost: parseFloat(values.annualCostOfSales),
    annualExpenses: parseFloat(values.annualExpenses),
    vehicleRegistrationNumber: values.vehicleRegistrationNumber,
    companyType: CompanyTypes.soleTrader,
    tradingSince: parseDate(
      '01',
      values.tradingSinceMonth,
      values.tradingSinceYear,
    ),
  };
};

export const mapCreateUpdateApplicationData = (
  values: ISoleTraderCompanyDetailsFormValues,
  companyData?: Company | null,
) => {
  const tradingAddress = companyData?.addresses?.[0];
  const resultAddress = {
    ...tradingAddress,
    __typename: undefined,
    city: tradingAddress?.city ?? '',
    postcode: tradingAddress?.postcode ?? '',
    lineOne: tradingAddress?.lineOne ?? '',
  };
  const resultEmail = {
    value: values.email,
    primary: true,
    kind: 'Home',
  };

  return {
    ...mapFormValues(values),
    uuid: companyData?.uuid ?? '',
    tradingName: undefined,
    businessName: values.tradingName,
    companyNature: undefined,
    natureOfBusiness: values.nature,
    vehicleRegistrationNumber: undefined,
    businessRegistrationNumber: values.vehicleRegistrationNumber,
    addresses: [resultAddress],
    emailAddress: undefined,
    emailAddresses: [resultEmail],
  };
};

export const preloadedValuesToInput = (details: {
  [key: string]: any;
}): ISoleTraderCompanyDetailsFormValues => {
  const tradingAddress = details.addresses
    ? {
        tradingAddress: {
          label: details.addresses[0].lineOne,
          id: details.addresses[0].serviceId,
        },
      }
    : null;

  return {
    tradingName: details.businessName,
    ...tradingAddress,
    nature: details.natureOfBusiness,
    tradingSinceYear: String(new Date(details.tradingSince).getFullYear()),
    tradingSinceMonth: String(new Date(details.tradingSince).getMonth() + 1),
    businessTelephoneNumber: details.telephoneNumbers?.[0].value,
    email: details.emailAddresses?.[0].value,
    annualTurnover: String(details.annualTurnover || ''),
    annualCostOfSales: String(details.annualSalesCost || ''),
    annualExpenses: String(details.annualExpenses || ''),
    vehicleRegistrationNumber: details.businessRegistrationNumber,
    existingFinanceReplacement: '',
    existingVehicle: details?.monthlyAmountBeingReplaced,
    monthlyAmountBeingReplaced: String(
      details.monthlyAmountBeingReplaced || '',
    ),
  };
};

export default mapFormValues;
