import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import FCWithFragments from '../../utils/FCWithFragments';
import CompanyBankDetails from 'components/CompanyBankDetails';
import { CompanyBankDetailsAccount } from '../../../generated/CompanyBankDetailsAccount';

interface IProps {
  account: CompanyBankDetailsAccount;
  onEdit: () => any;
}

const SummaryFormBankDetailsSection: FCWithFragments<IProps> = ({
  account,
  onEdit,
}) => (
    <StructuredList
      editable
      editDataTestId="edit-bank-details"
      onEditClicked={onEdit}
      list={[
        {
          label: 'Name on Card',
          value: account.accountName || '',
          dataTestId: 'summary-name-on-card',
        },
        {
          label: 'Sort Code',
          value: (account.sortCode || '').replace(
            /(\d{2})(\d{2})(\d{2})/,
            '$1-$2-$3',
          ),
          dataTestId: 'summary-sort-code',
        },
        {
          label: 'Account Number',
          value: account.accountNumber || '',
          dataTestId: 'summary-account-number',
        },
      ]}
      heading="Company Bank Details"
      headingDataTestId="bank_details_heading_data_testId"
      headingSize="large"
      className="-styled-headers"
    />
  );

SummaryFormBankDetailsSection.fragments = {
  account: CompanyBankDetails.fragments.account,
};

export default SummaryFormBankDetailsSection;
