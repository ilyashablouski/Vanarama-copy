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
          label: details.addresses.line_one,
          id: details.addresses.service_id,
        },
      }
    : null;
  return {
    tradingName: details.trading_name,
    ...tradingAddress,
    natureOfBusiness: details.company_nature,
    tradingSinceYear: String(new Date(details.trading_since).getFullYear()),
    tradingSinceMonth: String(new Date(details.trading_since).getMonth()),
    businessTelephoneNumber: details.telephone_numbers?.value || '',
    email: details.email_address,
    annualTurnover: String(details.annual_turnover),
    annualCostOfSales: String(details.annual_sales_cost),
    annualExpenses: String(details.annual_expenses),
    vehicleRegistrationNumber: details.vehicle_registration_number,
    monthlyAmountBeingReplaced: String(details.monthly_amount_being_replaced),
  };
};

export default mapFormValues;
