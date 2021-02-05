import { gql } from '@apollo/client';

export const PRODUCTS_FILTER_LIST = gql`
  query ProductVehicleList($filter: ProductVehicleListInputObject) {
    productVehicleList(filter: $filter) {
      totalCount
      nodesCount
      pageInfo {
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      aggs {
        financeType {
          key
          docCount
        }
        vehicleType {
          key
          docCount
        }
        transmission {
          key
          docCount
        }
        fuelType {
          key
          docCount
        }
        capBodyStyle {
          key
          docCount
        }
        term {
          key
          docCount
        }
        mileage {
          key
          docCount
        }
        initialPeriod {
          key
          docCount
        }
      }
      edges {
        cursor
        node {
          financeType
          # vehicleType
          manufacturerName
          modelName
          rental
          initialPayment
          rangeName
          transmission
          fuelType
          capBodyStyle
          term
          mileage
          availability
          capId
          derivativeId
        }
      }
    }
  }
`;

export default PRODUCTS_FILTER_LIST;
