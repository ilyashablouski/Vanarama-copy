import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { CreateExpenseMutation_createUpdateIncomeAndExpense as IIncomeAndExpense } from '../../../../generated/CreateExpenseMutation';
import { useStoredOrderQuery } from '../../../gql/storedOrder';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

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

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<IOlafPageProps>> {
  const client = createApolloClient({}, context);

  try {
    const { serviceBanner } = await getServiceBannerData(client);

    return {
      props: {
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return { notFound: true };
    }

    // throw any other errors
    // Next will render our custom pages/_error
    throw error;
  }
}

export default ExpensesPage;
