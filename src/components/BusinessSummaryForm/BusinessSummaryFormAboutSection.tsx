import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import React from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import { AboutFormPerson } from '../../../generated/AboutFormPerson';
import AboutForm from '../AboutForm';

interface IProps {
  person: AboutFormPerson;
  soletrader?: boolean;
  onEdit: () => any;
}

const BusinessSummaryFormAboutSection: FCWithFragments<IProps> = ({
  person,
  onEdit,
  soletrader,
}) => (
  <>
    <StructuredList
      editable
      editDataTestId="edit-bank-details"
      onEditClicked={onEdit}
      list={[
        {
          label: 'Title',
          value: person.title || '',
          dataTestId: 'summary-person-title',
        },
        {
          label: 'First Name',
          value: person.firstName || '',
          dataTestId: 'summary-person-first-name',
        },
        {
          label: 'Last Name',
          value: person.lastName || '',
          dataTestId: 'summary-person-last-name',
        },
        {
          label: 'Telephone Number',
          value:
            (person.telephoneNumbers && person.telephoneNumbers[0].value) || '',
          dataTestId: 'summary-person-phone-number',
        },
        {
          label: 'Email Address',
          value:
            (person.emailAddresses && person.emailAddresses[0].value) || '',
          dataTestId: 'summary-person-email',
        },
        {
          label: 'Type Of Company',
          value: soletrader ? 'Sole trader' : 'Limited',
          dataTestId: 'summary-person-type-of-company',
        },
      ]}
      heading="About You"
      headingDataTestId="about_you_heading_data_testId"
      headingSize="large"
      className="-styled-headers"
    />
    <br />
  </>
);

BusinessSummaryFormAboutSection.fragments = {
  person: AboutForm.fragments.person,
};

export default BusinessSummaryFormAboutSection;
