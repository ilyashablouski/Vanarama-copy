import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const ELIGIBILITY_CHECKER_CONTENT = gql`
  query EligibilityCheckerPageData {
    eligibilityCheckerLandingPage {
      id
      sections {
        leadText {
          heading
          description
        }
        featured1 {
          body
          title
          video
          layout
        }
        featured2 {
          body
          image {
            title
            description
            file {
              url
              fileName
              contentType
              details {
                size
                image {
                  width
                  height
                }
              }
            }
          }
          title
          layout
          iconList {
            text
          }
        }
        faqs {
          title
          questionSets {
            title
            questionAnswers {
              question
              answer
            }
          }
        }
        carousel {
          title
          name
          cardTestimonials {
            email
            date
            customerName
            companyName
            summary
            rating
          }
        }
      }
    }
  }
`;
