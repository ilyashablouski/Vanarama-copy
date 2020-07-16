import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import moment from 'moment';
import FCWithFragments from '../../utils/FCWithFragments';
import { VatDetails } from '../../../generated/VatDetails';

import { CompanyAssociate } from '../../../generated/CompanyAssociate';
import DirectorDetailsForm from 'components/DirectorDetailsForm/DirectorDetailsForm';

interface IBusinessSummaryFormDirectorDetailsSectionProps {
  director: CompanyAssociate;
  onEdit: () => any;
}

const BusinessSummaryFormDirectorDetailsSection: FCWithFragments<IBusinessSummaryFormDirectorDetailsSectionProps> = ({
  onEdit,
  director,
}) => {

  return <StructuredList
    editable
    editDataTestId="edit-director-details"
    onEditClicked={onEdit}
    list={[
      {
        label: 'Title',
        value: director.title || '',
        dataTestId: 'summary-director-title',
      },
      {
        label: 'Gender',
        value: director.gender || '',
        dataTestId: 'summary-director-gender',
      },
      {
        label: 'Date Of Birth',
        value: director.dateOfBirth || '',
        dataTestId: 'summary-director-birth-date',
      },
      {
        label: '% Shareholder Of Business',
        value: director.businessShare && `${director.businessShare}%` || '',
        dataTestId: 'summary-director-business-share',
      },
      {
        label: 'Number of Dependants',
        value: director.noOfDependants || '',
        dataTestId: 'summary-director-noOfDependants',
      },
      {
        label: 'Current Address',
        value: director.addresses && director.addresses[0] && director.addresses[0].postcode || '',
        dataTestId: 'summary-director-curr-address',
      },
      {
        label: 'Date Moved In',
        value: director.addresses && director.addresses[0] && director.addresses[0].startedOn || '',
        dataTestId: 'summary-director-curr-moved-in',
      },
      {
        label: 'Property Status',
        value: director.addresses && director.addresses[0] && director.addresses[0].propertyStatus || '',
        dataTestId: 'summary-director-curr-prop-status',
      },
      {
        label: 'Past Address',
        value: director.addresses && director.addresses[1] && director.addresses[1].postcode || '',
        dataTestId: 'summary-director-past-address',
      },
      {
        label: 'Date Moved In',
        value: director.addresses && director.addresses[1] && director.addresses[1].startedOn || '',
        dataTestId: 'summary-director-past-moved-in',
      },
      {
        label: 'Property Status',
        value: director.addresses && director.addresses[1] && director.addresses[1].propertyStatus || '',
        dataTestId: 'summary-director-past-prop-status',
      },
    ]}
    heading={`${director.firstName} ${director.lastName}`}
    headingDataTestId="company_director_details_heading_data_testId"
    className="-styled-headers"
    headingSize="lead"
  />
};

BusinessSummaryFormDirectorDetailsSection.fragments = {
  director: DirectorDetailsForm.fragments.associates,
};

export default BusinessSummaryFormDirectorDetailsSection;
