import { gql } from '@apollo/client';

const GET_INSURANCE_LANDING_PAGE = gql`
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
          image {
            title
            file {
              url
            }
          }
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
          description
          cards {
            titleTag
            name
            title
            body
            link {
              text
              url
            }
            image {
              title
              file {
                url
              }
            }
          }
        }

        carousel {
          name
          cards {
            titleTag
            name
            title
            body
            image {
              file {
                url
              }
            }
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
          heroCard {
            title
            body
          }
        }
      }
    }
  }
`;

export default GET_INSURANCE_LANDING_PAGE;
