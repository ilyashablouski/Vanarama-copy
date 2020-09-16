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
    companyNature: values.natureofBusiness,
    annualSalesCost: parseFloat(values.annualCostOfSales),
    annualExpenses: parseFloat(values.annualExpenses),
    vehicleRegistrationNumber: values.vehicleRegistrationNumber,
    companyType: CompanyTypes.soleTrader,
    tradingSince,
  };
};

export default mapFormValues;
