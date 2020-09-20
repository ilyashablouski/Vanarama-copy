import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import React from 'react';
import { gql } from '@apollo/client';
import moment from 'moment';
import FCWithFragments from '../../utils/FCWithFragments';

import { CompanyAssociate_addresses as Address } from '../../../generated/CompanyAssociate';
import { addressToDisplay } from '../../utils/address';
import { formatPreviousAddressesArray, sortAddresses } from './helpers';
import { DirectorFormValues } from '../DirectorDetailsForm/interfaces';

interface IBusinessSummaryFormDirectorDetailsSectionProps {
  director: DirectorFormValues & { addresses?: Address[] };
  orderBySharehold: number;
  onEdit: () => any;
}

const formatDateOfBirth = (year: string, month: string, day: string) =>
  moment(new Date(+year, +month, +day)).format('DD MMMM YYYY') || '';

const BusinessSummaryFormDirectorDetailsSection: FCWithFragments<IBusinessSummaryFormDirectorDetailsSectionProps> = ({
  onEdit,
  director,
  orderBySharehold,
}) => {
  const sortedAddresses = sortAddresses(director.addresses);
  const currentAddress = (sortedAddresses && sortedAddresses[0]) || null;
  const previousAddress = formatPreviousAddressesArray(
    sortedAddresses || [],
    orderBySharehold,
  );

  const list = [
    {
      label: 'Title',
      value: director.title || '',
      dataTestId: `summary-director[${orderBySharehold}]-title`,
    },
    {
      label: 'Gender',
      value: director.gender || '',
      dataTestId: `summary-director[${orderBySharehold}]-gender`,
    },
    {
      label: 'Date Of Birth',
      value: formatDateOfBirth(
        director.yearOfBirth,
        director.monthOfBirth,
        director.dayOfBirth,
      ),
      dataTestId: `summary-director[${orderBySharehold}]-birth-date`,
    },
    {
      label: '% Shareholder Of Business',
      value: (director.shareOfBusiness && `${director.shareOfBusiness}%`) || '',
      dataTestId: `summary-director[${orderBySharehold}]-business-share`,
    },
    {
      label: 'Number of Dependants',
      value: director.numberOfDependants || '',
      dataTestId: `summary-director[${orderBySharehold}]-noOfDependants`,
    },
    {
      label: 'Current Address',
      value: (currentAddress && addressToDisplay(currentAddress)) || '',
      dataTestId: `summary-director[${orderBySharehold}]-curr-address`,
    },
    {
      label: 'Date Moved In',
      value:
        (currentAddress &&
          moment(currentAddress.startedOn).format('MMMM YYYY')) ||
        '',
      dataTestId: `summary-director[${orderBySharehold}]-curr-moved-in`,
    },
    {
      label: 'Property Status',
      value: (currentAddress && currentAddress.propertyStatus) || '',
      dataTestId: `summary-director[${orderBySharehold}]-curr-prop-status`,
    },
    ...previousAddress,
  ];

  return (
    <StructuredList
      editable
      editDataTestId={`edit-directorА-details[${orderBySharehold}]`}
      onEditClicked={onEdit}
      list={list.filter(el => !!el.value)}
      heading={`${director.firstName} ${director.lastName}`}
      headingDataTestId={`company_director_details_heading_[${orderBySharehold}]`}
      className="-styled-headers"
      headingSize="lead"
    />
  );
};

BusinessSummaryFormDirectorDetailsSection.fragments = {
  director: gql`
    fragment CompanyAssociate on PersonType {
      uuid
      title
      firstName
      lastName
      gender
      dateOfBirth
      noOfDependants
      businessShare
      roles {
        position
      }
      addresses {
        serviceId
        propertyStatus
        startedOn
        city
        lineOne
        lineTwo
        postcode
      }
    }
  `,
};

export default BusinessSummaryFormDirectorDetailsSection;
