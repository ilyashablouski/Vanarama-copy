import StructuredList from '@vanarama/uibook/lib/components/organisms/structured-list';
import { gql } from 'apollo-boost';
import React from 'react';
import { SummaryFormIncomeSectionIncome } from '../../../generated/SummaryFormIncomeSectionIncome';
import FCWithFragments from '../../utils/FCWithFragments';
import { toCurrencyDisplay } from '../../utils/helpers';

interface IProps {
  income: SummaryFormIncomeSectionIncome;
}

const SummaryFormIncomeSection: FCWithFragments<IProps> = ({ income }) => (
  <StructuredList
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
        label: 'Net Disposal Income',
        value: toCurrencyDisplay(income.netDisposableIncome || 0),
        dataTestId: 'summary-net-disposable',
      },
    ]}
    heading="Monthly Expenses"
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
