import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import { GetServerSidePropsContext, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { addApolloState, initializeApollo } from 'apolloClient';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_PERSON_INFORMATION_DATA } from 'containers/PersonalInformationContainer/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from 'gql/companies';
import { GET_MY_ORDERS_DATA } from 'containers/OrdersInformation/gql';
import { GET_PERSON_QUERY } from 'containers/LoginFormContainer/gql';
import Loading from 'core/atoms/loading';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import ServiceBanner from 'core/molecules/service-banner';
import PasswordChangeContainer from '../../../containers/PasswordChangeContainer';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationContainer/PersonalInformation';
import OrderInformationContainer from '../../../containers/OrdersInformation/OrderInformationContainer';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';
import { MyAccount_myAccountMaskedDetailsByPersonUuid } from '../../../../generated/MyAccount';
import { MyOrdersTypeEnum } from '../../../../generated/globalTypes';
import { GetMyOrders_myOrders } from '../../../../generated/GetMyOrders';
import { isUserAuthenticatedSSR } from '../../../utils/authentication';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../../generated/GetCompaniesByPersonUuid';
import { isEditPersonalInformationFeatureFlagEnabled } from '../../../utils/helpers';
import useAccountRouteChangeStart from '../../../hooks/useAccountRouteChangeStart';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

const Button = dynamic(() => import('core/atoms/button/'), {
  loading: () => <Skeleton count={1} />,
});
const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  person: MyAccount_myAccountMaskedDetailsByPersonUuid;
  uuid: string;
  partyUuid: string;
  orders: GetMyOrders_myOrders[];
  quotes: GetMyOrders_myOrders[];
  isEditPersonalInformationEnabled?: boolean;
  serviceBanner?: IServiceBanner;
}

const handleNetworkError = () =>
  toast.error(
    'Sorry there seems to be an issue with your password reset request. Pleaser try again in a few moments',
    '',
  );

const breadcrumbItems = [
  {
    link: {
      href: '/',
      label: 'home',
    },
  },
  {
    link: {
      href: '',
      label: 'my details',
    },
  },
];

const metaData = {
  canonicalUrl: null,
  legacyUrl: null,
  metaDescription: null,
  metaRobots: null,
  name: null,
  pageType: null,
  publishedOn: null,
  slug: null,
  title: 'My Account Details | Vanarama',
  schema: null,
  breadcrumbs: null,
};

const MyDetailsPage: NextPage<IProps> = ({
  person,
  uuid,
  orders,
  quotes,
  isEditPersonalInformationEnabled,
  serviceBanner,
}) => {
  const [resetPassword, setResetPassword] = useState(false);
  const router = useRouter();
  const isLoading = useAccountRouteChangeStart(router);

  const client = useApolloClient();
  useEffect(
    () => client.onResetStore(() => router.push('/account/login-register')),
    [client, router],
  );

  return (
    <>
      <ServiceBanner
        enable={serviceBanner?.enable}
        message={serviceBanner?.message}
        link={serviceBanner?.link}
      />
      <div className="row:title -mt-500">
        <Breadcrumbs items={breadcrumbItems} />
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="my-details-heading"
        >
          My Details
        </Heading>
      </div>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <>
          <OrderInformationContainer
            orders={orders}
            quotes={quotes}
            uuid={uuid}
          />
          <div className="row:my-details">
            <div className="my-details--form">
              <PersonalInformationFormContainer
                person={person}
                uuid={uuid}
                isEditPersonalInformationEnabled={
                  isEditPersonalInformationEnabled
                }
              />
            </div>
            <div className="my-details--form ">
              <Heading
                tag="span"
                size="large"
                color="black"
                className="-mb-300"
              >
                Password
              </Heading>
              {!resetPassword ? (
                <div className="form">
                  <Text>
                    It’s important that you choose a strong password for your
                    account and don&#39;t re-use it for other accounts. If you
                    need to change your password, simply hit the button below.
                  </Text>
                  <div className="-pt-300 -pb-300">
                    <Button
                      label="Change Password"
                      color="teal"
                      onClick={() => setResetPassword(true)}
                    />
                  </div>
                </div>
              ) : (
                <PasswordChangeContainer
                  uuid={uuid}
                  onCompleted={() => {
                    toast.success('Your New Password Has Been Saved', '');
                    setResetPassword(false);
                  }}
                  onNetworkError={handleNetworkError}
                />
              )}
            </div>
          </div>
        </>
      )}

      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isEditPersonalInformationEnabled = isEditPersonalInformationFeatureFlagEnabled(
    context.req.headers.cookie,
  );

  const client = initializeApollo(undefined, context);
  try {
    if (!isUserAuthenticatedSSR(context?.req?.headers.cookie || '')) {
      return {
        redirect: {
          destination: '/account/login-register?redirect=/account/my-details',
          permanent: false,
        },
      };
    }
    const { data } = await client.query({
      query: GET_PERSON_QUERY,
    });
    const [{ data: personData }, { data: partyUuidData }] = await Promise.all([
      client.query({
        query: GET_PERSON_INFORMATION_DATA,
        variables: {
          personUuid: data.getPerson.uuid,
        },
      }),
      client.query({
        query: GET_COMPANIES_BY_PERSON_UUID,
        variables: {
          personUuid: data.getPerson.uuid,
        },
      }),
    ]);

    const partyUuids = partyUuidData.companiesByPersonUuid.map(
      (companies: CompaniesByPersonUuid) => companies.partyUuid,
    );

    const [{ data: orders }, { data: quotes }] = await Promise.all([
      client.query({
        query: GET_MY_ORDERS_DATA,
        variables: {
          partyUuid: [...partyUuids, data.getPerson.partyUuid],
          filter: MyOrdersTypeEnum.ALL_ORDERS,
        },
      }),
      client.query({
        query: GET_MY_ORDERS_DATA,
        variables: {
          partyUuid: [...partyUuids, data.getPerson.partyUuid],
          filter: MyOrdersTypeEnum.ALL_QUOTES,
        },
      }),
    ]);

    const { serviceBanner } = await getServiceBannerData(client);

    return addApolloState(client, {
      props: {
        person: personData.myAccountMaskedDetailsByPersonUuid,
        uuid: data.getPerson.uuid,
        orders: orders.myOrders,
        quotes: quotes.myOrders,
        isEditPersonalInformationEnabled,
        serviceBanner: serviceBanner || null,
      },
    });
  } catch {
    const props = addApolloState(client, { props: {} });
    return {
      props,
      redirect: {
        destination:
          '/account/login-register?redirect=/account/my-details&isUnauthorised=true',
        permanent: false,
      },
    };
  }
}

export default MyDetailsPage;
