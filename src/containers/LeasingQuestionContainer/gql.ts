import { gql, useQuery } from '@apollo/client';
import {
  GenericPageQuestionQuery,
  GenericPageQuestionQueryVariables,
} from '../../../generated/GenericPageQuestionQuery';

export const GENERIC_PAGE_QUESTION = gql`
  query GenericPageQuestionQuery($slug: String!) {
    genericPage(slug: $slug) {
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
      sections {
        hero {
          title
          body
          image {
            file {
              url
            }
          }
          heroCard {
            title
            body
          }
        }
        tiles {
          position
          name
          tilesTitle
          titleTag
        }
        leadText {
          titleTag
          heading
          description
          position
        }
        iconBullets1 {
          title
          iconBullets {
            text
          }
        }
        iconBullets2 {
          title
          iconBullets {
            text
          }
        }
        faqs {
          title
          body
          questionSets {
            title
            questionAnswers {
              question
              answer
            }
          }
        }
        cards {
          position
          name
          titleTag
          description
          title
          cards {
            title
            name
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            titleTag
            link {
              text
              url
              legacyUrl
            }
          }
        }
        hero {
          position
          flag
          title
          titleTag
          body
          image {
            title
            description
            file {
              url
              fileName
              contentType
            }
          }
          heroCard {
            title
            body
          }
        }
        leadText {
          position
          heading
          titleTag
          description
        }
        rowText {
          position
          heading
          titleTag
          subHeading
          body
        }
        featured {
          layout
          body
          title
          video
          link {
            text
            url
            legacyUrl
          }
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
        }
        featured1 {
          layout
          body
          titleTag
          title
          link {
            url
            text
            legacyUrl
          }
          image {
            title
            description
            file {
              url
              fileName
            }
          }
        }
        featured2 {
          layout
          body
          titleTag
          link {
            url
            text
            legacyUrl
          }
          image {
            title
            description
            file {
              url
              fileName
            }
          }
          title
          cards {
            name
            title
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            link {
              text
              url
              legacyUrl
            }
          }
        }
        carousel {
          title
          name
          cards {
            name
            title
            image {
              title
              description
              file {
                url
                fileName
              }
            }
            body
            link {
              text
              url
              legacyUrl
            }
          }
        }
        tiles {
          position
          name
          tilesTitle
          titleTag
          tiles {
            body
            title
            link {
              text
              url
              legacyUrl
            }
            image {
              title
              description
              file {
                url
                fileName
              }
            }
          }
        }
        questionSet {
          title
          questionAnswers {
            answer
            question
          }
        }
      }
      intro
      body
      featuredImage {
        title
        description
        file {
          url
          fileName
          contentType
        }
      }
    }
  }
`;

export function useGenericPageQuestion(slug: string) {
  return useQuery<GenericPageQuestionQuery, GenericPageQuestionQueryVariables>(
    GENERIC_PAGE_QUESTION,
    {
      variables: {
        slug,
      },
    },
  );
}
