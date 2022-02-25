import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { ApolloError } from '@apollo/client';
import FleetLandingPage from '../../containers/FleetPageContainer';
import createApolloClient from '../../apolloClient';
import {
  GENERIC_PAGE,
  IGenericPage,
  IGenericPageProps,
} from '../../gql/genericPage';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { decodeData, encodeData } from '../../utils/data';
import { convertErrorToProps } from '../../utils/helpers';
import {
  GenericPageQuery,
  GenericPageQueryVariables,
} from '../../../generated/GenericPageQuery';
import { PageTypeEnum } from '../../types/common';
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

const FleetPage: NextPage<IGenericPage> = ({ data }) => (
  <FleetLandingPage data={decodeData(data)} />
);

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IGenericPageProps>> {
  try {
    const client = createApolloClient({});
    const [{ data }, { serviceBanner }] = await Promise.all([
      client.query<GenericPageQuery, GenericPageQueryVariables>({
        query: GENERIC_PAGE,
        variables: {
          slug: 'fleet',
          isPreview: !!context?.preview,
        },
      }),
      getServiceBannerData(client),
    ]);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data: encodeData(data),
        serviceBanner: serviceBanner || null,
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
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default FleetPage;
