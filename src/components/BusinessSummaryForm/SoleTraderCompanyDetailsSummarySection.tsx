import StructuredList from 'core/organisms/structured-list';
import React from 'react';
import { gql } from '@apollo/client';
import FCWithFragments from '../../utils/FCWithFragments';
import { SoleTraderCompanyDetailsSummary } from '../../../generated/SoleTraderCompanyDetailsSummary';
import { dateToFormat } from '../../utils/dates';

interface IProps {
  company: SoleTraderCompanyDetailsSummary;
  onEdit: () => any;
}

const financeToBeReplaced = (company: SoleTraderCompanyDetailsSummary) =>
  company.monthlyAmountBeingReplaced
    ? [
        {
          label: 'Monthly Amount Being Replaced',
          value: String(company.monthlyAmountBeingReplaced),
          dataTestId: 'summary-company-amount-replaced',
        },
        {
          label: 'Vehicle Registration Number',
          value: String(company.vehicleRegistrationNumber || ''),
          dataTestId: 'summary-company-vehicle-reg',
        },
      ]
    : [];

const SoleTraderCompanyDetailsSummarySection: FCWithFragments<IProps> = ({
  company,
  onEdit,
}) => (
  <>
    <StructuredList
      editable
      editDataTestId="edit-bank-details"
      onEditClicked={onEdit}
      list={[
        {
          label: 'Trading Name',
          value: company.tradingName || '',
          dataTestId: 'summary-company-trading-name',
        },
        {
          label: 'Trading Address',
          value: `${company.addresses?.[0].lineOne} 
          ${company.addresses?.[0].lineTwo}
          ${company.addresses?.[0].city}
          ${company.addresses?.[0].country}
          ${company.addresses?.[0].postcode}`,
          dataTestId: 'summary-comapny-trading-address',
        },
        {
          label: 'Nature of Business',
          value: company.companyNature || '',
          dataTestId: 'summary-company-nature',
        },
        {
          label: 'Trading Since',
          value: dateToFormat(company.tradingSince) || '',
          dataTestId: 'summary-company-trading-since',
        },
        {
          label: 'Business Phone Number',
          value: company.telephoneNumbers?.[0].value || '',
          dataTestId: 'summary-company-telephone',
        },
        {
          label: 'Email Address',
          value: company.emailAddresses?.[0].value || '',
          dataTestId: 'summary-company-email',
        },
        {
          label: 'Annual Turnover',
          value: String(company.annualTurnover || 'N/A'),
          dataTestId: 'summary-company-annual-turnover',
        },
        {
          label: 'Annual Cost of Sales',
          value: String(company.annualSalesCost || 'N/A'),
          dataTestId: 'summary-company-annual-sales-cost',
        },
        {
          label: 'Annual Expenses',
          value: String(company.annualExpenses || 'N/A'),
          dataTestId: 'summary-company-annual-expenses',
        },
        ...financeToBeReplaced(company),
      ]}
      heading="Company Details"
      dataTestId="company-details-summary-heading"
      headingSize="large"
      className="-styled-headers"
    />
    <br />
  </>
);

SoleTraderCompanyDetailsSummarySection.fragments = {
  company: gql`
    fragment SoleTraderCompanyDetailsSummary on CompanyType {
      __typename
      uuid
      tradingName
      monthlyAmountBeingReplaced
      annualTurnover
      companyNature
      annualSalesCost
      annualExpenses
      vehicleRegistrationNumber
      companyType
      tradingSince
      addresses {
        serviceId
        kind
        lineOne
        lineTwo
        country
        city
        postcode
      }
      emailAddresses {
        kind
        value
      }
      telephoneNumbers {
        kind
        value
      }
    }
  `,
};

export default SoleTraderCompanyDetailsSummarySection;
