import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import React, { useMemo } from 'react';
import moment from 'moment';
import FCWithFragments from '../../utils/FCWithFragments';

import { CompanyAssociate } from '../../../generated/CompanyAssociate';
import DirectorDetailsForm from '../DirectorDetailsForm/DirectorDetailsForm';
import { addressToDisplay } from '../../utils/address';

interface IBusinessSummaryFormDirectorDetailsSectionProps {
  director: CompanyAssociate;
  orderBySharehold: number;
  onEdit: () => any;
}

const BusinessSummaryFormDirectorDetailsSection: FCWithFragments<IBusinessSummaryFormDirectorDetailsSectionProps> = ({
  onEdit,
  director,
  orderBySharehold,
}) => {
  const sortedAddresses = useMemo(
    () =>
      director.addresses?.length &&
      director.addresses
        .slice()
        .sort(
          (a, b) =>
            new Date(a.startedOn).getTime() - new Date(b.startedOn).getTime(),
        ),
    [director.addresses],
  );
  const currentAddress = (sortedAddresses && sortedAddresses[0]) || null;
  const previousAddress = (sortedAddresses && sortedAddresses[1]) || null;

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
      value: moment(director.dateOfBirth).format('DD MMMM YYYY') || '',
      dataTestId: `summary-director[${orderBySharehold}]-birth-date`,
    },
    {
      label: '% Shareholder Of Business',
      value: (director.businessShare && `${director.businessShare}%`) || '',
      dataTestId: `summary-director[${orderBySharehold}]-business-share`,
    },
    {
      label: 'Number of Dependants',
      value: director.noOfDependants || '',
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
    {
      label: 'Past Address',
      value: (previousAddress && addressToDisplay(previousAddress)) || '',
      dataTestId: `summary-director-past-address[${orderBySharehold}]`,
    },
    {
      label: 'Date Moved In',
      value:
        (previousAddress &&
          moment(previousAddress.startedOn).format('MMMM YYYY')) ||
        '',
      dataTestId: `summary-director-past-moved-in[${orderBySharehold}]`,
    },
    {
      label: 'Property Status',
      value: (previousAddress && previousAddress.propertyStatus) || '',
      dataTestId: `summary-director-past-prop-status[${orderBySharehold}]`,
    },
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
  director: DirectorDetailsForm.fragments.associates,
};

export default BusinessSummaryFormDirectorDetailsSection;
