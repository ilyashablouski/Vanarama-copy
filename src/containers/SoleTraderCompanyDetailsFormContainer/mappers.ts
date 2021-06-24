import { ISoleTraderCompanyDetailsFormValues } from '../../components/SoleTraderCompanyDetailsForm/interfaces';
import { CompanyTypes } from '../../models/enum/CompanyTypes';
import { UpdateSoleTraderCompanyMutation_createUpdateSoleTraderCompany as Company } from '../../../generated/UpdateSoleTraderCompanyMutation';
import { parseDate } from '../../utils/dates';

export const mapFormValues = (values: ISoleTraderCompanyDetailsFormValues) => {
  return {
    addresses: [
      {
        serviceId: values.tradingAddress?.id,
        lineOne: values.tradingAddress?.label,
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

export const mapCreateUpdteApplicationData = (
  values: ISoleTraderCompanyDetailsFormValues,
  companyData?: Company | null,
) => ({
  ...mapFormValues(values),
  companyNature: undefined,
  tradingName: undefined,
  businessName: values.tradingName,
  natureOfBusiness: values.nature,
  addresses: [
    {
      ...companyData?.addresses?.[0],
    },
  ],
  emailAddress: undefined,
  emailAddresses: [
    {
      value: values.email,
      kind: 'Home',
    },
  ],
  uuid: companyData?.uuid,
});

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
    vehicleRegistrationNumber: details.vehicleRegistrationNumber,
    existingFinanceReplacement: '',
    monthlyAmountBeingReplaced: String(
      details.monthlyAmountBeingReplaced || '',
    ),
  };
};

export default mapFormValues;
