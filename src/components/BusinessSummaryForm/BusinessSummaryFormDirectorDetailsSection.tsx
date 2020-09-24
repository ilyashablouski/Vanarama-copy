import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import React from 'react';
import { gql } from '@apollo/client';
import moment from 'moment';
import FCWithFragments from '../../utils/FCWithFragments';

import { CompanyAssociate_addresses as Address } from '../../../generated/CompanyAssociate';
import { addressToDisplay } from '../../utils/address';
import { sortAddresses } from './helpers';
import { DirectorFormValues } from '../DirectorDetailsForm/interfaces';
import { formatDate } from '../../utils/dates';

interface IBusinessSummaryFormDirectorDetailsSectionProps {
  director: DirectorFormValues & { addresses?: Address[] };
  orderBySharehold: number;
  onEdit: () => any;
}

const BusinessSummaryFormDirectorDetailsSection: FCWithFragments<IBusinessSummaryFormDirectorDetailsSectionProps> = ({
  onEdit,
  director,
  orderBySharehold,
}) => {
  const { currentAddress, previousAddress } = sortAddresses(
    director.addresses,
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
      value: formatDate(
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
