import { gql, useMutation, useQuery } from '@apollo/client';

import { IMAGE_FILE_FRAGMENT } from '../../gql/image';
import { LogOutUserMutation } from '../../../generated/LogOutUserMutation';
import {
  ServiceBannerQuery,
  ServiceBannerQueryVariables,
} from '../../../generated/ServiceBannerQuery';

// eslint-disable-next-line import/prefer-default-export
export const GET_PRIMARY_HEADER_DATA = gql`
  ${IMAGE_FILE_FRAGMENT}
  query GetPrimaryHeaderData {
    primaryHeader {
      id
      links {
        text
        url
      }
      linkGroups {
        name
        body
        promotionalImages {
          url
          legacyUrl
          image {
            file {
              fileName
              ...imageFile
            }
          }
        }
        links {
          text
          url
          label
        }
        linkGroups {
          name
          links {
            text
            url
            label
          }
          promotionalImage {
            url
            legacyUrl
            image {
              file {
                fileName
                ...imageFile
              }
            }
          }
        }
      }
    }
  }
`;

export const LOGOUT_USER_MUTATION = gql`
  mutation LogOutUserMutation {
    logoutV2 {
      isSuccessful
    }
  }
`;

export function useLogOutMutation() {
  return useMutation<LogOutUserMutation>(LOGOUT_USER_MUTATION);
}

export const SERVICE_BANNER_QUERY = gql`
  query ServiceBannerQuery($slug: String, $isPreview: Boolean) {
    serviceBanner(slug: $slug, isPreview: $isPreview) {
      link {
        text
        url
      }
      message
      enable
    }
  }
`;

export function useServiceBannerQuery(slug?: string, isPreview?: boolean) {
  return useQuery<ServiceBannerQuery, ServiceBannerQueryVariables>(
    SERVICE_BANNER_QUERY,
    {
      variables: {
        slug,
        isPreview,
      },
    },
  );
}
