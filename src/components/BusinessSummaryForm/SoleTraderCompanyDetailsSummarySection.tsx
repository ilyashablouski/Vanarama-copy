import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import React from 'react';
import { gql } from '@apollo/client';
import FCWithFragments from '../../utils/FCWithFragments';
import { SoleTraderCompanyDetailsSummary } from '../../../generated/SoleTraderCompanyDetailsSummary';

interface IProps {
  company: SoleTraderCompanyDetailsSummary;
  onEdit: () => any;
}

const financeToBeReplaced = (company: SoleTraderCompanyDetailsSummary) =>
  company.monthlyAmountBeingReplaced
    ? [
        {
          label: 'Monthly Amount Being Replaced',
          value: company.monthlyAmountBeingReplaced,
          dataTestId: 'summary-company-amount-replaced',
        },
        {
          label: 'Vehicle Registration Number',
          value: company.vehicleRegistrationNumber,
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
          value: company.addresses || '',
          dataTestId: 'summary-comapny-trading-address',
        },
        {
          label: 'Nature of Business',
          value: company.companyNature || '',
          dataTestId: 'summary-company-nature',
        },
        {
          label: 'Trading Since',
          value: company.tradingSince,
          dataTestId: 'summary-company-trading-since',
        },
        {
          label: 'Business Phone Number',
          value:
            (company.telephoneNumbers && company.telephoneNumbers[0].value) ||
            '',
          dataTestId: 'summary-company-telephone',
        },
        {
          label: 'Email Address',
          value:
            (company.emailAddresses && company.emailAddresses[0].value) || '',
          dataTestId: 'summary-company-email',
        },
        {
          label: 'Annual Turn Over',
          value: company.annualTurnover,
          dataTestId: 'summary-company-annual-turnover',
        },
        {
          label: 'Annual Cost of Sales',
          value: company.annualSalesCost,
          dataTestId: 'summary-company-annual-sales-cost',
        },
        {
          label: 'Annual Expenses',
          value: company.annualExpenses,
          dataTestId: 'summary-company-annual-expenses',
        },
        ...financeToBeReplaced(company),
      ]}
      heading="About You"
      headingDataTestId="about_you_heading_data_testId"
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
