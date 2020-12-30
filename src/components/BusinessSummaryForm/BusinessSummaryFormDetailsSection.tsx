import dynamic from 'next/dynamic';
import { gql } from '@apollo/client';
import React from 'react';
import { SummaryFormDetailsSectionCompany } from '../../../generated/SummaryFormDetailsSectionCompany';
import FCWithFragments from '../../utils/FCWithFragments';
import { addressToDisplay } from '../../utils/address';
import Skeleton from '../Skeleton';
import { fullMonthFormatDate } from '../../utils/dates';

const StructuredList = dynamic(() => import('core/organisms/structured-list'), {
  loading: () => <Skeleton count={3} />,
});

interface IProps {
  company: SummaryFormDetailsSectionCompany;
  onEdit: () => any;
}

const parseTelephone = (number: string) =>
  `${number.slice(0, 5)} ${number.slice(5)}` || '';

const SummaryFormDetailsSection: FCWithFragments<IProps> = ({
  onEdit,
  company,
}) => {
  const registratedAddressObject =
    company.addresses?.length &&
    company.addresses.find(_ => _.kind === 'registered');
  const registratedAddress = registratedAddressObject
    ? addressToDisplay(registratedAddressObject)
    : '';
  const tradingAddressObject =
    company.addresses?.length &&
    company.addresses.find(_ => _.kind === 'trading');
  const tradingAddress = tradingAddressObject
    ? addressToDisplay(tradingAddressObject)
    : registratedAddress;

  const companyEmail =
    company.emailAddresses.length === 1
      ? company.emailAddresses[0].value
      : company.emailAddresses.find(_ => _.primary)?.value || '';

  const list = [
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
      value: fullMonthFormatDate(new Date(company.tradingSince)) || '',
      dataTestId: 'summary-trading-since',
    },
    {
      label: 'Business Telephone Number',
      value:
        (company.telephoneNumbers?.length &&
          company.telephoneNumbers[0].value &&
          parseTelephone(company.telephoneNumbers[0].value)) ||
        '',
      dataTestId: 'summary-telephone-number',
    },
    {
      label: 'Email',
      value: companyEmail,
      name: 'summary-email-address',
      dataTestId: 'summary-email-address',
    },
  ];

  return (
    <>
      <StructuredList
        editable
        editDataTestId="edit-company-details"
        onEditClicked={onEdit}
        list={list}
        heading="Company Details"
        headingDataTestId="company_details_heading_data_testId"
        headingSize="large"
        className="-styled-headers"
      />
      <br />
    </>
  );
};

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
        serviceId
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
    }
  `,
};

export default SummaryFormDetailsSection;
