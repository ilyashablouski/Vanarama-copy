import dynamic from 'next/dynamic';
import * as toast from 'core/atoms/toast/Toast';
import { NextPage } from 'next';
import React, { useState } from 'react';
import Breadcrumbs from 'core/atoms/breadcrumbs-v2';
import { PreviewNextPageContext } from 'types/common';
import createApolloClient, { AUTHORIZATION_ERROR_CODE } from 'apolloClient';
import { ApolloError } from '@apollo/client';
import { GET_PERSON_INFORMATION_DATA } from 'containers/PersonalInformationContainer/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from 'gql/companies';
import { GET_MY_ORDERS_DATA } from 'containers/OrdersInformation/gql';
import { GET_PERSON_QUERY } from 'containers/LoginFormContainer/gql';
import PasswordChangeContainer from '../../../containers/PasswordChangeContainer';
import PersonalInformationFormContainer from '../../../containers/PersonalInformationContainer/PersonalInformation';
import OrderInformationContainer from '../../../containers/OrdersInformation/OrderInformationContainer';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';
import { MyAccount_myAccountDetailsByPersonUuid } from '../../../../generated/MyAccount';
import { MyOrdersTypeEnum } from '../../../../generated/globalTypes';
import { GetMyOrders_myOrders } from '../../../../generated/GetMyOrders';

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
  person: MyAccount_myAccountDetailsByPersonUuid;
  error: boolean;
  uuid: string;
  partyUuid: string;
  orders: GetMyOrders_myOrders[];
  quotes: GetMyOrders_myOrders[];
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
  error,
  orders,
  quotes,
}) => {
  const [resetPassword, setResetPassword] = useState(false);

  if (error) {
    return (
      <Text tag="p" color="danger" size="lead">
        Sorry, an unexpected error occurred. Please try again!
      </Text>
    );
  }

  return (
    <>
      <div className="row:title">
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
      <OrderInformationContainer orders={orders} quotes={quotes} uuid={uuid} />
      <div className="row:my-details">
        <div className="my-details--form">
          <PersonalInformationFormContainer person={person} uuid={uuid} />
        </div>
        <div className="my-details--form ">
          <Heading tag="span" size="large" color="black" className="-mb-300">
            Password
          </Heading>
          {!resetPassword ? (
            <div className="form">
              <Text>
                It’s important that you choose a strong password for your
                account and don&#39;t re-use it for other accounts. If you need
                to change your password, simply hit the button below.
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
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export async function getServerSideProps(context: PreviewNextPageContext) {
  const client = createApolloClient({}, context);

  try {
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

    const [{ data: orders }, { data: quotes }] = await Promise.all([
      client.query({
        query: GET_MY_ORDERS_DATA,
        variables: {
          partyUuid: [
            partyUuidData.companiesByPersonUuid[0].partyUuid,
            data.getPerson.uuid,
          ],
          filter: MyOrdersTypeEnum.ALL_ORDERS,
        },
      }),
      client.query({
        query: GET_MY_ORDERS_DATA,
        variables: {
          partyUuid: [
            partyUuidData.companiesByPersonUuid[0].partyUuid,
            data.getPerson.uuid,
          ],
          filter: MyOrdersTypeEnum.ALL_QUOTES,
        },
      }),
    ]);

    return {
      props: {
        person: personData.myAccountDetailsByPersonUuid,
        uuid: data.getPerson.uuid,
        orders: orders.myOrders,
        quotes: quotes.myOrders,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    if (
      apolloError?.graphQLErrors[0]?.extensions?.code ===
      AUTHORIZATION_ERROR_CODE
    ) {
      context?.res?.setHeader('set-cookie', [
        'ac=deleted; path=/; Max-Age=-1',
        'ic=deleted; path=/; Max-Age=-1',
      ]);
      context?.res?.writeHead(302, { Location: '/account/login-register' });
      context?.res?.end();
    }
    return {
      props: {
        error: true,
      },
    };
  }
}

export default MyDetailsPage;
