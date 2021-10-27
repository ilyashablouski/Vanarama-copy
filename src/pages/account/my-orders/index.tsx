import { NextPage } from 'next';
import React from 'react';
import { ApolloError } from '@apollo/client';
import createApolloClient, { AUTHORIZATION_ERROR_CODE } from 'apolloClient';
import MyOverview from '../../../containers/MyOverview/MyOverview';
import { PreviewNextPageContext } from '../../../types/common';
import { GET_MY_ORDERS_DATA } from '../../../containers/OrdersInformation/gql';
import { MyOrdersTypeEnum } from '../../../../generated/globalTypes';
import { GET_PERSON_QUERY } from '../../../containers/LoginFormContainer/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../../gql/companies';
import { GetMyOrders } from '../../../../generated/GetMyOrders';
import { GetPerson_getPerson } from '../../../../generated/GetPerson';

interface IProps {
  orders: GetMyOrders;
  person: GetPerson_getPerson;
  partyUuid: string[];
}

const MyOrdersPage: NextPage<IProps> = ({ orders, person, partyUuid }) => {
  return (
    <MyOverview
      quote={false}
      orders={orders}
      person={person}
      partyUuid={partyUuid}
    />
  );
};

export async function getServerSideProps(context: PreviewNextPageContext) {
  const client = createApolloClient({}, context);

  try {
    const { data } = await client.query({
      query: GET_PERSON_QUERY,
    });

    const { data: partyUuidData } = await client.query({
      query: GET_COMPANIES_BY_PERSON_UUID,
      variables: {
        personUuid: data.getPerson.uuid,
      },
    });

    const partyUuid = [
      partyUuidData.companiesByPersonUuid[0].partyUuid,
      partyUuidData.companiesByPersonUuid[1].partyUuid,
      data.getPerson.partyUuid,
    ];

    const { data: orders } = await client.query({
      query: GET_MY_ORDERS_DATA,
      variables: {
        partyUuid,
        filter: MyOrdersTypeEnum.ALL_ORDERS,
      },
    });

    return {
      props: {
        orders,
        person: data.getPerson,
        partyUuid: [
          partyUuidData.companiesByPersonUuid[0].partyUuid,
          partyUuidData.companiesByPersonUuid[1].partyUuid,
        ],
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;

    if (
      apolloError?.graphQLErrors[0]?.extensions?.code ===
      AUTHORIZATION_ERROR_CODE
    ) {
      context?.res?.setHeader('set-cookie', [
        'ac=; path=/; Max-Age=-1',
        'ic=; path=/; Max-Age=-1',
        'ic_local=; path=/; Max-Age=-1',
      ]);
      return {
        redirect: {
          destination: '/account/login-register?redirect=/account/my-orders',
          permanent: false,
        },
      };
    }

    return {
      props: {
        error: true,
      },
    };
  }
}

export default MyOrdersPage;
