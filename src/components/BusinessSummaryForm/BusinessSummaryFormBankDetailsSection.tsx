import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import React from 'react';
import moment from 'moment';
import FCWithFragments from '../../utils/FCWithFragments';
import CompanyBankDetails from '../CompanyBankDetails';
import { ICompanyBankDetails } from '../CompanyBankDetails/interfaces';

interface IProps {
  account: ICompanyBankDetails;
  onEdit: () => any;
}

const formatTimeAtBank = (year?: string, month?: string) =>
  moment(`${year} ${month}`, 'YYYY MM').format('MMMM YYYY');

const SummaryFormBankDetailsSection: FCWithFragments<IProps> = ({
  account,
  onEdit,
}) => (
  <>
    <StructuredList
      editable
      editDataTestId="edit-bank-details"
      onEditClicked={onEdit}
      list={[
        {
          label: 'Bank Name',
          value: account.bankName || '',
          dataTestId: 'summary-bank-name',
        },
        {
          label: 'Account Name',
          value: account.accountName || '',
          dataTestId: 'summary-account-name',
        },
        {
          label: 'Account Number',
          value: account.accountNumber || '',
          dataTestId: 'summary-account-number',
        },
        {
          label: 'Sort Code',
          value: (account.sortCode || [])
            .join('')
            .replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3'),
          dataTestId: 'summary-sort-code',
        },
        {
          label: 'Time At Bank',
          value: formatTimeAtBank(account.joinedAtYear, account.joinedAtMonth),
          dataTestId: 'summary-account-time',
        },
      ]}
      heading="Company Bank Details"
      headingDataTestId="bank_details_heading_data_testId"
      headingSize="large"
      className="-styled-headers"
    />
    <br />
  </>
);

SummaryFormBankDetailsSection.fragments = {
  account: CompanyBankDetails.fragments.account,
};

export default SummaryFormBankDetailsSection;
