import { NextPage } from 'next';
import { useRouter } from 'next/router';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { CreateExpenseMutation_createUpdateIncomeAndExpense as IIncomeAndExpense } from '../../../../generated/CreateExpenseMutation';
import { useStoredOrderQuery } from '../../../gql/storedOrder';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const { uuid, redirect } = router.query as QueryParams;

  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const { data: orderData } = useStoredOrderQuery();
  const order = orderData?.storedOrder?.order;
  const personUuid = uuid || orderData?.storedOrder?.order?.personUuid || '';

  const onCompleteClick = (
    createUpdateIncomeAndExpense: IIncomeAndExpense | null,
  ) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: order?.uuid || '',
          incomeAndExpenses: createUpdateIncomeAndExpense,
        },
      },
    })
      .then(() => getUrlParam({ uuid: personUuid }))
      .then(params => redirect || `/olaf/bank-details${params}`)
      .then(url => router.push(url, url));
  };

  return (
    <OLAFLayout>
      <SecureModalLayout>
        <ExpensesFormContainer
          isEdit={!!redirect}
          order={order}
          personUuid={personUuid}
          onCompleted={data =>
            onCompleteClick(data?.createUpdateIncomeAndExpense)
          }
        />
      </SecureModalLayout>
    </OLAFLayout>
  );
};

export default ExpensesPage;
