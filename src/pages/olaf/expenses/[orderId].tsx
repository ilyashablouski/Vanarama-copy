/* eslint-disable @typescript-eslint/camelcase */
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history/[orderId]';
import { formValuesToInputCreditApplication } from '../../../mappers/mappersCreditApplication';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../gql/creditApplication';
import { CreateExpenseMutation_createUpdateIncomeAndExpense } from '../../../../generated/CreateExpenseMutation';
import useGetOrderId from '../../../hooks/useGetOrderId';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  const orderId = useGetOrderId();

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onCompleteClick = (
    createUpdateIncomeAndExpense: CreateExpenseMutation_createUpdateIncomeAndExpense | null,
  ) => {
    createUpdateCA({
      variables: {
        input: formValuesToInputCreditApplication({
          ...creditApplication.data?.creditApplicationByOrderUuid,
          orderUuid: orderId,
          incomeAndExpenses: createUpdateIncomeAndExpense,
        }),
      },
    });
    const params = getUrlParam({ uuid: personUuid });
    const url =
      router.query.redirect === 'summary'
        ? `/olaf/summary/[orderId]${params}`
        : `/olaf/bank-details/[orderId]${params}`;

    router.push(url, url.replace('[orderId]', orderId));
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
