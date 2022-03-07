import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextPage,
} from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { ApolloError } from '@apollo/client';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import EmploymentFormContainer from '../../../containers/EmploymentFormContainer/EmploymentFormContainer';
import OLAFLayout, {
  IOlafPageProps,
} from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { SaveEmploymentHistoryMutation_createUpdateEmploymentHistory as IEmploymentHistory } from '../../../../generated/SaveEmploymentHistoryMutation';
import { useStoredOrderQuery } from '../../../gql/storedOrder';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const EmploymentHistoryPage: NextPage = () => {
  const router = useRouter();
  const { uuid, redirect } = router.query as QueryParams;

  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const { data: orderData } = useStoredOrderQuery();
  const order = orderData?.storedOrder?.order;

  const personUuid = uuid || orderData?.storedOrder?.order?.personUuid || '';

  const onCompleteClick = (
    createUpdateEmploymentHistory: IEmploymentHistory[] | null,
  ) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: order?.uuid || '',
          employmentHistories: createUpdateEmploymentHistory,
        },
      },
    })
      .then(() => getUrlParam({ uuid: personUuid }))
      .then(params => redirect || `/olaf/expenses${params}`)
      .then(url => router.push(url, url));
  };

  return (
    <OLAFLayout>
      <SecureModalLayout>
        <EmploymentFormContainer
          isEdit={!!redirect}
          personUuid={personUuid}
          onCompleted={data =>
            onCompleteClick(data?.createUpdateEmploymentHistory)
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

export default EmploymentHistoryPage;
