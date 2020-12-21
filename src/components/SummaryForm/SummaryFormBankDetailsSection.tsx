import StructuredList from 'core/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import { SummaryFormBankDetailsSectionAccount } from '../../../generated/SummaryFormBankDetailsSectionAccount';
import FCWithFragments from '../../utils/FCWithFragments';

interface IProps {
  account: SummaryFormBankDetailsSectionAccount;
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
        label: 'Bank',
        value: account.bankName || '',
        dataTestId: 'summary-bank-name',
      },
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
    heading="Bank Details"
    headingDataTestId="bank_details_heading_data_testId"
  />
);

SummaryFormBankDetailsSection.fragments = {
  account: gql`
    fragment SummaryFormBankDetailsSectionAccount on BankAccountType {
      __typename
      uuid
      bankName
      accountName
      sortCode
      accountNumber
    }
  `,
};

export default SummaryFormBankDetailsSection;
