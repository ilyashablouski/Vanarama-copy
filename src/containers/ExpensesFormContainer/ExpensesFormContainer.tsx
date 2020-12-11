import React from 'react';
import dynamic from 'next/dynamic';
import { useExpensesData, useUpdateExpenses } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';

const Loading = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/loading'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const IncomeCalculator = dynamic(
  () => import('../../components/IncomeCalculator'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const ExpensesFormContainer: React.FC<IProps> = ({
  personUuid,
  onCompleted,
}) => {
  const { loading, error, data } = useExpensesData(personUuid);
  const [expenses] = useUpdateExpenses(personUuid, onCompleted);

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.personByUuid) {
    return null;
  }

  const { incomeAndExpense, partyId } = data.personByUuid;
  return (
    <IncomeCalculator
      expenditure={incomeAndExpense}
      onSubmit={values =>
        expenses({
          variables: {
            input: formValuesToInput(partyId, values),
          },
        })
      }
    />
  );
};

export default ExpensesFormContainer;
