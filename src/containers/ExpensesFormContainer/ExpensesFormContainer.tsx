import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import React from 'react';
import IncomeCalculator from '../../components/IncomeCalculator';
import { useExpensesData, useUpdateExpenses } from './gql';
import { IProps } from './interfaces';
import { formValuesToInput } from './mappers';

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
