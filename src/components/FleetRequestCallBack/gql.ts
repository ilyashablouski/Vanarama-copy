import { useMutation, useQuery, gql } from '@apollo/client';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';

export const GET_FLEET_PAGE_CONTENT = gql`
query GetFleetLandingPage {
    fleetLandingPage {
      id
      sections {
        featured1 {
          title
          titleTag
          body
          image {
            title
            file {
              url
            }
          }
          video
          layout
        }
        
        featured2 {
          title
          titleTag
          body
          image {
            title
            file {
              url
            }
          }
          video
          layout
        }
        
        featured3 {
          title
          titleTag
          body
          image {
            title
            file {
              url
            }
          }
          video
          layout
        }
        
        leadText {
          heading
          titleTag
          description
        }
        
        hero {
          flag
          title
          body
          image {
            title
            description
            file {
              url
            }
          }
        }
        
        tiles {
          name
          tiles {
            body
            title
            image {
              title
              file {
                url
              }
            }
          }
        }
      }
    }
  }  
`;

export function useFleetLandingPage() {
    return useQuery<GetFleetLandingPage, {}>(GET_FLEET_PAGE_CONTENT);
}