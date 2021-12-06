import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const IMAGE_FILE_FRAGMENT = gql`
  fragment imageFile on File {
    url
    details {
      image {
        width
        height
      }
    }
  }
`;
