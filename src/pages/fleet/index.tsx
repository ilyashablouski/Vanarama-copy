import { ApolloError } from '@apollo/client';
import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import FleetLandingPage from '../../containers/FleetPageContainer';
import createApolloClient from '../../apolloClient';
import GET_FLEET_PAGE_CONTENT from '../../containers/FleetPageContainer/gql';
import {
  GetFleetLandingPage,
  GetFleetLandingPageVariables,
} from '../../../generated/GetFleetLandingPage';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { IErrorProps } from '../../types/common';
import { convertErrorToProps } from '../../utils/helpers';
import ErrorPage from '../_error';

interface IFleetPage {
  data: GetFleetLandingPage | undefined;
  error?: IErrorProps;
}

const FleetPage: NextPage<IFleetPage> = ({ data, error }) => {
  if (error || !data) {
    return <ErrorPage errorData={error} />;
  }

  return <FleetLandingPage data={data} />;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data } = await client.query<
      GetFleetLandingPage,
      GetFleetLandingPageVariables
    >({
      query: GET_FLEET_PAGE_CONTENT,
      variables: {
        isPreview: !!context?.preview,
      },
    });

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        data,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        error: convertErrorToProps(error),
      },
    };
  }
}

export default FleetPage;
