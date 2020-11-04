import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import React from 'react';
import DefaultErrorPage from 'next/error';
import { ApolloError } from '@apollo/client';
import FleetLandingPage from '../../containers/FleetPageContainer';
import createApolloClient from '../../apolloClient';
import GET_FLEET_PAGE_CONTENT from '../../containers/FleetPageContainer/gql';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';

interface IFleetPage {
  data: GetFleetLandingPage | undefined;
  error: ApolloError | undefined;
}

const FleetPage: NextPage<IFleetPage> = ({ data, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return <FleetLandingPage data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GET_FLEET_PAGE_CONTENT,
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default FleetPage;
