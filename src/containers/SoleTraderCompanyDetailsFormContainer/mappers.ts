import { ISoleTraderCompanyDetailsFormValues } from '../../components/SoleTraderCompanyDetailsForm/interfaces';
import { CompanyTypes } from '../../models/enum/CompanyTypes';

export const mapFormValues = (values: ISoleTraderCompanyDetailsFormValues) => {
  const tradingSince = new Date(
    Number(values.tradingSinceYear),
    Number(values.tradingSinceMonth),
    0,
  );

  return {
    addresses: [
      {
        serviceId: values.tradingAddress.id,
        lineOne: values.tradingAddress.label,
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
    companyNature: values.natureOfBusiness,
    annualSalesCost: parseFloat(values.annualCostOfSales),
    annualExpenses: parseFloat(values.annualExpenses),
    vehicleRegistrationNumber: values.vehicleRegistrationNumber,
    companyType: CompanyTypes.soleTrader,
    tradingSince,
  };
};

export const prelodedValuesToInput = (details: any) => {
  const tradingAddress = details.addresses
    ? {
        tradingAddress: {
          label: details.addresses.lineOne,
          id: details.addresses.serviceId,
        },
      }
    : null;
  return {
    tradingName: details.tradingName,
    ...tradingAddress,
    natureOfBusiness: details.companyNature,
    tradingSinceYear: String(new Date(details.tradingSince).getFullYear()),
    tradingSinceMonth: String(new Date(details.tradingSince).getMonth()),
    businessTelephoneNumber: details?.telephoneNumbers?.value || '',
    email: details.emailAddress,
    annualTurnover: String(details.annualTurnover),
    annualCostOfSales: String(details.annualSalesCost),
    annualExpenses: String(details.annualExpenses),
    vehicleRegistrationNumber: details.vehicleRegistrationNumber,
    monthlyAmountBeingReplaced: String(details.monthlyAmountBeingReplaced),
  };
};

export default mapFormValues;
