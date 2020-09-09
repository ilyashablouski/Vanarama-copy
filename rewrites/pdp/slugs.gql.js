const { gql } = require('@apollo/client');

const SLUGS = gql`
  query($ids: [ID!]!, $vehicleType: VehicleTypeEnum!) {
    derivatives(ids: $ids, vehicleType: $vehicleType) {
      id
      vehicleType
      slug
      manufacturer {
        slug
      }
      range {
        slug
      }
      model {
        slug
      }
      bodyStyle {
        slug
      }
    }
  }
`;

module.exports = SLUGS;
