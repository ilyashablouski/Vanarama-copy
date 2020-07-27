import { gql } from "@apollo/client";

export const GET_INSURANCE_LANDING_PAGE = gql`
query GetInsuranceLandingPage {
    insuranceLandingPage {
      id
      body
      sections {
        featured1 {
          title
          titleTag
          body
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
          layout
        }
  
        cards {
          name
          cards {
            titleTag
            name
            title
            body
          }
        }
        carousel {
          name
          cards {
            titleTag
            name
            title
            body
          }
        }
  
        leadText {
          heading
          titleTag
          description
        }
  
        hero {
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
      }
    }
  }
`;