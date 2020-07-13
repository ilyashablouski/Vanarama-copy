import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { gql } from '@apollo/client';
import React from 'react';
import { SummaryFormIncomeSectionIncome } from '../../../generated/SummaryFormIncomeSectionIncome';
import FCWithFragments from '../../utils/FCWithFragments';
import { toCurrencyDisplay } from '../../utils/helpers';

interface IProps {
  income: SummaryFormIncomeSectionIncome;
  onEdit: () => any;
}

const SummaryFormIncomeSection: FCWithFragments<IProps> = ({
  income,
  onEdit,
}) => (
  <StructuredList
    editable
    editDataTestId="edit-expenses"
    onEditClicked={onEdit}
    list={[
      {
        label: 'Average Monthly Income',
        value: toCurrencyDisplay(income.averageMonthlyIncome),
        dataTestId: 'summary-average-monthly-income',
      },
      {
        label: 'All Expenses Total',
        value: toCurrencyDisplay(income.totalMonthlyExpenses || 0),
        dataTestId: 'summary-total-expenses',
      },
      {
        label: 'Net Disposable Income',
        value: toCurrencyDisplay(income.netDisposableIncome || 0),
        dataTestId: 'summary-net-disposable',
      },
    ]}
    heading="Monthly Expenses"
    headingDataTestId="monthly_expenses_data_testId"
  />
);

SummaryFormIncomeSection.fragments = {
  income: gql`
    fragment SummaryFormIncomeSectionIncome on IncomeAndExpenseType {
      __typename
      uuid
      averageMonthlyIncome
      totalMonthlyExpenses
      netDisposableIncome
    }
  `,
};

export default SummaryFormIncomeSection;
