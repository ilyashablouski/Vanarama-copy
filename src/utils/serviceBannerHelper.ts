import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { SERVICE_BANNER_QUERY } from '../containers/HeaderContainer/gql';
import {
  ServiceBannerQuery,
  ServiceBannerQueryVariables,
} from '../../generated/ServiceBannerQuery';

export const serviceBannerInitialData = {
  serviceBanner: {
    enable: null,
    message: null,
    link: null,
  },
};

// eslint-disable-next-line import/prefer-default-export
export const getServiceBannerData = async (
  client: ApolloClient<NormalizedCacheObject>,
  slug?: string,
  isPreview?: boolean,
) => {
  try {
    const { data } = await client.query<
      ServiceBannerQuery,
      ServiceBannerQueryVariables
    >({
      query: SERVICE_BANNER_QUERY,
      variables: {
        slug,
        isPreview,
      },
    });
    return data;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to get service banner with slug', e);
    return serviceBannerInitialData;
  }
};
