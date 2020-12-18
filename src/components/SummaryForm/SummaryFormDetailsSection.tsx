import StructuredList from 'core/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import moment from 'moment';
import { SummaryFormDetailsSectionPerson } from '../../../generated/SummaryFormDetailsSectionPerson';
import FCWithFragments from '../../utils/FCWithFragments';

interface IProps {
  person: SummaryFormDetailsSectionPerson;
  onEdit: () => any;
}

const SummaryFormDetailsSection: FCWithFragments<IProps> = ({
  onEdit,
  person,
}) => (
  <StructuredList
    editable
    editDataTestId="edit-your-details"
    onEditClicked={onEdit}
    list={[
      {
        label: 'Email',
        value: person.emailAddresses.find(_ => _.primary)?.value || '',
        dataTestId: 'summary-email-address',
      },
      {
        label: 'Full name',
        value: [person.title, person.firstName, person.lastName].join(' '),
        dataTestId: 'summary-fullname',
      },
      {
        label: 'Mobile',
        value:
          person.telephoneNumbers?.find(_ => _.kind === 'Mobile')?.value || '',
        dataTestId: 'summary-mobile',
      },
      {
        label: 'Date of Birth',
        value: person.dateOfBirth
          ? moment(person.dateOfBirth).format('DD/MM/YYYY')
          : '',
        dataTestId: 'summary-dob',
      },
      {
        label: 'Country of Birth',
        value: person.countryOfBirth || '',
        dataTestId: 'summary-country',
      },
      {
        label: 'Nationality',
        value: person.nationality || '',
        dataTestId: 'summary-nationality',
      },
      {
        label: 'Marital Status',
        value: person.maritalStatus || '',
        dataTestId: 'summary-marital-status',
      },
      {
        label: 'No. of Dependants',
        value: person.noOfDependants || '',
        dataTestId: 'summary-dependants',
      },
      {
        label: 'No. of Adults in House',
        value: person.noOfAdultsInHousehold || '',
        dataTestId: 'summary-adults',
      },
    ]}
    heading="Your Details"
    headingDataTestId="your_details_heading_data_testId"
  />
);

SummaryFormDetailsSection.fragments = {
  person: gql`
    fragment SummaryFormDetailsSectionPerson on PersonType {
      __typename
      uuid
      emailAddresses {
        __typename
        uuid
        primary
        value
      }
      telephoneNumbers {
        __typename
        uuid
        kind
        value
      }
      title
      firstName
      lastName
      dateOfBirth
      countryOfBirth
      nationality
      maritalStatus
      noOfDependants
      noOfAdultsInHousehold
    }
  `,
};

export default SummaryFormDetailsSection;
