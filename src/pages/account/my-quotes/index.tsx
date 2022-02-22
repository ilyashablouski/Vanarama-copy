import { GetServerSidePropsContext, NextPage } from 'next';
import React from 'react';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import MyOverview from '../../../containers/MyOverview/MyOverview';
import { GetMyOrders } from '../../../../generated/GetMyOrders';
import { GetPerson_getPerson } from '../../../../generated/GetPerson';
import { addApolloState, initializeApollo } from '../../../apolloClient';
import { isUserAuthenticatedSSR } from '../../../utils/authentication';
import { GET_PERSON_QUERY } from '../../../containers/LoginFormContainer/gql';
import { GET_COMPANIES_BY_PERSON_UUID } from '../../../gql/companies';
import { GetCompaniesByPersonUuid_companiesByPersonUuid as CompaniesByPersonUuid } from '../../../../generated/GetCompaniesByPersonUuid';
import { GET_MY_ORDERS_DATA } from '../../../containers/OrdersInformation/gql';
import { MyOrdersTypeEnum } from '../../../../generated/globalTypes';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';

interface IProps {
  quotes: GetMyOrders;
  person: GetPerson_getPerson;
  partyUuid: string[];
  serviceBanner?: IServiceBanner;
}

const MyOrdersPage: NextPage<IProps> = ({
  quotes,
  person,
  partyUuid,
  serviceBanner,
}) => {
  return (
    <MyOverview
      quote
      data={quotes}
      person={person}
      partyUuid={partyUuid}
      serviceBanner={serviceBanner}
    />
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const client = initializeApollo(undefined, context);

  try {
    if (!isUserAuthenticatedSSR(context?.req?.headers.cookie || '')) {
      return {
        redirect: {
          destination: '/account/login-register?redirect=/account/my-quotes',
          permanent: false,
        },
      };
    }

    const { data } = await client.query({
      query: GET_PERSON_QUERY,
    });

    const { data: partyUuidData } = await client.query({
      query: GET_COMPANIES_BY_PERSON_UUID,
      variables: {
        personUuid: data.getPerson.uuid,
      },
    });

    const partyUuids = partyUuidData.companiesByPersonUuid.map(
      (companies: CompaniesByPersonUuid) => companies.partyUuid,
    );

    const { data: quotes } = await client.query({
      query: GET_MY_ORDERS_DATA,
      variables: {
        partyUuid: [...partyUuids, data.getPerson.partyUuid],
        filter: MyOrdersTypeEnum.ALL_QUOTES,
      },
    });

    const { serviceBanner } = await getServiceBannerData(client);

    return addApolloState(client, {
      props: {
        quotes,
        person: data.getPerson,
        partyUuid: [...partyUuids, data.getPerson.partyUuid],
        serviceBanner: serviceBanner || null,
      },
    });
  } catch {
    const props = addApolloState(client, { props: {} });
    return {
      props,
      redirect: {
        destination:
          '/account/login-register?redirect=/account/my-quotes&isUnauthorised=true',
        permanent: false,
      },
    };
  }
}

export default MyOrdersPage;
