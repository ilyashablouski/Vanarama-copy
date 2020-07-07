import { gql } from '@apollo/client';

const HUB_CAR_CONTENT = gql`
  query HubCarPageData {
    hubCarPage {
      id
      sections {
        hero {
          title
          body
          image {
            title
            file {
              url
            }
          }
        }
        leadText {
          heading
          description
        }
        featured1 {
          title
          body
          image {
            file {
              url
            }
          }
        }
        featured2 {
          title
          body
          image {
            file {
              url
            }
          }
        }
        steps {
          heading
          steps {
            title
            body
          }
        }
        tiles {
          name
          tiles {
            title
            body
            image {
              file {
                url
              }
              title
            }
          }
        }
      }
    }
    productCarousel(vehicleType: CAR, pageSize: 9, onOffer: true) {
      capId
      isOnOffer
      manufacturerName
      derivativeName
      rangeName
      imageUrl
      leadTime
      averageRating
      businessRate
      personalRate
      offerPosition
      keyInformation {
        name
        value
      }
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { HUB_CAR_CONTENT };
