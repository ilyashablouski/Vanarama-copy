import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import BankDetailsFormContainer from '../../../containers/BankDetailsFormContainer/BankDetailsFormContainer';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { CreateUpdateBankAccountMutation_createUpdateBankAccount as IBankAccount } from '../../../../generated/CreateUpdateBankAccountMutation';
import { useStoredOrderQuery } from '../../../gql/storedOrder';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const mapBankAccountToCreditApplication = (
  createUpdateBankAccount: IBankAccount | null,
) => {
  const [joinedAtYear, joinedAtMonth] = (
    createUpdateBankAccount?.joinedAt ?? '-'
  ).split('-');

  return {
    ...(createUpdateBankAccount || {}),
    joinedAtYear,
    joinedAtMonth,
    joinedAt: undefined,
  };
};

const BankDetailsPage: NextPage = () => {
  const router = useRouter();
  const { uuid, redirect } = router.query as QueryParams;

  const { data: orderData } = useStoredOrderQuery();
  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const order = orderData?.storedOrder?.order;

  const personUuid = uuid || orderData?.storedOrder?.order?.personUuid || '';

  const onCompleteClick = (createUpdateBankAccount: IBankAccount | null) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: order?.uuid || '',
          bankAccounts: [
            mapBankAccountToCreditApplication(createUpdateBankAccount),
          ],
        },
      },
    })
      .then(() => getUrlParam({ uuid: personUuid }))
      .then(params => `/olaf/summary${params}`)
      .then(url => router.push(url, url));
  };

  return (
    <OLAFLayout>
      <SecureModalLayout>
        <BankDetailsFormContainer
          isEdit={!!redirect}
          personUuid={personUuid}
          onCompleted={data => onCompleteClick(data?.createUpdateBankAccount)}
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

export default BankDetailsPage;
