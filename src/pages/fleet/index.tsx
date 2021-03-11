import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import { ApolloError } from '@apollo/client';
import FleetLandingPage from '../../containers/FleetPageContainer';
import createApolloClient from '../../apolloClient';
import GET_FLEET_PAGE_CONTENT from '../../containers/FleetPageContainer/gql';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';

interface IFleetPage {
  data: GetFleetLandingPage | undefined;
  error: ApolloError | undefined;
}

const FleetPage: NextPage<IFleetPage> = ({ data }) => {
  return <FleetLandingPage data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GET_FLEET_PAGE_CONTENT,
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default FleetPage;
