import { gql } from '@apollo/client';
import { EligibilityCheckerPageData } from '../../../generated/EligibilityCheckerPageData';
import FeaturedSection from '../../components/FeaturedSection';
import { IErrorProps } from '../../types/common';

export interface IEligbilityCheckerPage {
  data?: EligibilityCheckerPageData | undefined;
  error?: IErrorProps;
}

// eslint-disable-next-line import/prefer-default-export
export const ELIGIBILITY_CHECKER_CONTENT = gql`
  query EligibilityCheckerPageData {
    eligibilityCheckerLandingPage {
      id
      metaData {
        title
        name
        metaRobots
        metaDescription
        legacyUrl
        pageType
        canonicalUrl
        slug
        schema
        publishedOn
        breadcrumbs
      }
      featuredImage {
        file {
          url
        }
      }
      sections {
        leadText {
          heading
          description
        }
        featured1 {
          ...GenericPageQueryFeatured
        }
        featured2 {
          ...GenericPageQueryFeatured
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
  ${FeaturedSection.fragments.featured}
`;
