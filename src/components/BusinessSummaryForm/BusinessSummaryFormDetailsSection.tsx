import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import moment from 'moment';
import { SummaryFormDetailsSectionCompany } from '../../../generated/SummaryFormDetailsSectionCompany';
import FCWithFragments from '../../utils/FCWithFragments';
import { addressToDisplay } from '../../utils/address';

interface IProps {
  company: SummaryFormDetailsSectionCompany;
  onEdit: () => any;
}

const SummaryFormDetailsSection: FCWithFragments<IProps> = ({
  onEdit,
  company,
}) => {
  const registratedAddressObject = company.addresses?.length && company.addresses.find(_ => _.kind === 'registered');
  const registratedAddress = registratedAddressObject ? addressToDisplay(registratedAddressObject) : '';
  const tradingAddressObject = company.addresses?.length && company.addresses.find(_ => _.kind === 'trading');
  const tradingAddress = tradingAddressObject ? addressToDisplay(tradingAddressObject) : registratedAddress;

  const companyEmail = (company.emailAddresses.length === 1) ?
    company.emailAddresses[0].value :
    company.emailAddresses.find(_ => _.primary)?.value || '';

  return <React.Fragment>
    <StructuredList
      editable
      editDataTestId="edit-company-details"
      onEditClicked={onEdit}
      list={[
        {
          label: 'Business Name',
          value: company.legalName || '',
          dataTestId: 'summary-business-name',
        },
        {
          label: 'Business Registration Number',
          value: company.companyNumber || '',
          dataTestId: 'summary-company-number',
        },
        {
          label: 'Nature of Business',
          value: company.companyNature || '',
          dataTestId: 'summary-business-nature',
        },
        {
          label: 'Registered Address',
          value: registratedAddress,
          dataTestId: 'summary-registered-address',
        },
        {
          label: 'Trading Address',
          value: tradingAddress,
          dataTestId: 'summary-trading-address',
        },
        {
          label: 'Trading Since',
          value: moment(company.tradingSince)
            .format('MMMM YYYY')
            || '',
          dataTestId: 'summary-trading-since',
        },
        {
          label: 'Business Telephone Number',
          value: company.telephoneNumbers?.length
            && company.telephoneNumbers[0].value
            && `${company.telephoneNumbers[0].value.slice(0,5)} ${company.telephoneNumbers[0].value.slice(5)}`
            || '',
          dataTestId: 'summary-telephone-number',
        },
        {
          label: 'Email',
          value: companyEmail,
          name: 'summary-email-address',
          dataTestId: 'summary-email-address',
        },
      ]}
      heading="Company Details"
      headingDataTestId="company_details_heading_data_testId"
      headingSize="large"
      className="-styled-headers"
    />
    <br />
  </React.Fragment>
}

SummaryFormDetailsSection.fragments = {
  company: gql`
    fragment SummaryFormDetailsSectionCompany on CompanyType {
      __typename
      uuid
      legalName
      companyNumber
      companyNature
      tradesOutsideUk
      tradingSince
      turnoverPercentageOutsideUk {
        country
        percentage
      }
      addresses {
        uuid
        kind
        lineOne
        lineTwo
        country
        city
        postcode
      }
      emailAddresses {
        uuid
        kind
        value
        primary
      }
      telephoneNumbers {
        uuid
        kind
        value
        primary
      }
      bankAccounts {
        ...CompanyBankDetailsAccount
      }
    }
  `,
};

export default SummaryFormDetailsSection;
