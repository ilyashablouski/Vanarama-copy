import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { CreateExpenseMutation_createUpdateIncomeAndExpense as IIncomeAndExpense } from '../../../../generated/CreateExpenseMutation';
import useGetOrderId from '../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  const orderId = useGetOrderId();

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onCompleteClick = (
    createUpdateIncomeAndExpense: IIncomeAndExpense | null,
  ) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: orderId,
          incomeAndExpenses: createUpdateIncomeAndExpense,
        },
      },
    })
      .then(() => getUrlParam({ uuid: personUuid }))
      .then(params =>
        router.query.redirect === 'summary'
          ? `/olaf/summary${params}`
          : `/olaf/bank-details${params}`,
      )
      .then(url => router.push(url, url));
  };

  return (
    <OLAFLayout>
      <ExpensesFormContainer
        onCompleted={({ createUpdateIncomeAndExpense }) =>
          onCompleteClick(createUpdateIncomeAndExpense)
        }
        personUuid={personUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(ExpensesPage, { getDataFromTree });
