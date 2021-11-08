import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useExpensesData, useUpdateExpenses } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';
import Skeleton from '../../components/Skeleton';
import { isUserAuthenticated } from '../../utils/authentication';

const Loading = dynamic(() => import('core/atoms/loading'), {
  loading: () => <Skeleton count={1} />,
});
const IncomeCalculator = dynamic(
  () => import('../../components/IncomeCalculator'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const ExpensesFormContainer: React.FC<IProps> = ({
  isEdit,
  personUuid,
  onCompleted,
  order,
}) => {
  const { loading, error, data } = useExpensesData(personUuid);
  const [expenses] = useUpdateExpenses(personUuid, onCompleted);

  const incomeAndExpense = useMemo(() => {
    if (!isEdit && !isUserAuthenticated()) {
      return null;
    }

    return data?.personByUuid?.incomeAndExpense || null;
  }, [data?.personByUuid?.incomeAndExpense, isEdit]);

  if (loading || !order) {
    return <Loading size="large" />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data || !data.personByUuid) {
    return null;
  }

  return (
    <IncomeCalculator
      order={order}
      expenditure={incomeAndExpense}
      onSubmit={values =>
        expenses({
          variables: {
            input: formValuesToInput(data.personByUuid!.partyId, values),
          },
        })
      }
    />
  );
};

export default ExpensesFormContainer;
