import { gql } from '@apollo/client';

export const HELP_ME_CHOOSE = gql`
  query HelpMeChoose(
    $filter: FilterListObject
    $pagination: PaginationInputObject
    $sort: SortObject
  ) {
    helpMeChoose(filter: $filter, pagination: $pagination, sort: $sort) {
      vehicles {
        financeType
        vehicleType
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
        derivativeId
        derivativeName
        availability
        lqUrl
        url
      }
      aggregation {
        totalVehicles
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
        availability {
          key
          docCount
        }
        rental {
          key
          docCount
        }
        initialPayment {
          key
          docCount
        }
      }
    }
  }
`;

export default HELP_ME_CHOOSE;
