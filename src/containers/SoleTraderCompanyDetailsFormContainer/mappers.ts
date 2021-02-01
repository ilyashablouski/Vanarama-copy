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

export const prelodedValuesToInput = (details: {
  [key: string]: any;
}): ISoleTraderCompanyDetailsFormValues => {
  const tradingAddress = details.addresses
    ? {
        tradingAddress: {
          label: details.addresses[0].line_one,
          id: details.addresses[0].service_id,
        },
      }
    : null;

  return {
    tradingName: details.business_name,
    ...tradingAddress,
    nature: details.nature_of_business,
    tradingSinceYear: String(new Date(details.trading_since).getFullYear()),
    tradingSinceMonth: String(new Date(details.trading_since).getMonth() + 1),
    businessTelephoneNumber: details.telephone_numbers?.[0].value,
    email: details.email_addresses?.[0].value,
    annualTurnover: String(details.annual_turnover || ''),
    annualCostOfSales: String(details.annual_sales_cost || ''),
    annualExpenses: String(details.annual_expenses || ''),
    vehicleRegistrationNumber: details.vehicle_registration_number,
    existingFinanceReplacement: '',
    monthlyAmountBeingReplaced: String(
      details.monthly_amount_being_replaced || '',
    ),
  };
};

export default mapFormValues;
