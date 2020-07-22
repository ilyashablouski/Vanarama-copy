import { useMutation, useQuery, gql } from '@apollo/client';
import { GetFleetLandingPage } from '../../../generated/GetFleetLandingPage';
import {
  TestimonialsData,
  TestimonialsData_testimonials as TestimonialData,
  TestimonialsDataVariables,
} from '../../../generated/TestimonialsData';
import { TESTIMONIALS_DATA } from '../../gql/testimonials';

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

export function useTestimonialsData() {
  return useQuery<TestimonialsData>(
    TESTIMONIALS_DATA,
    {
      variables: { size: 1, page: 1 },
      // notifyOnNetworkStatusChange: true,
    },
  );
}