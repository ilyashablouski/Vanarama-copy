import { gql, useLazyQuery } from '@apollo/client';
import {
  suggestionList,
  suggestionListVariables,
} from '../../../generated/suggestionList';
import {
  fullTextSearchVehicleList,
  fullTextSearchVehicleListVariables,
} from '../../../generated/fullTextSearchVehicleList';

export const GET_SUGGESTIONS_DATA = gql`
  query suggestionList($query: String) {
    suggestionList(
      query: $query
      sort: [
        { field: offer_ranking, direction: ASC }
        { field: rental, direction: ASC }
      ]
    ) {
      vehicleSuggestions {
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
        fullDescription
        configId
      }
    }
  }
`;

export const GET_TEXT_SEARCH_VEHICLES_DATA = gql`
  query fullTextSearchVehicleList($query: String, $from: Int) {
    fullTextSearchVehicleList(
      query: $query
      sort: [
        { field: offer_ranking, direction: ASC }
        { field: rental, direction: ASC }
      ]
      pagination: { size: 12, from: $from }
    ) {
      vehicles {
        availability
        availabilityMessage
        availabilitySort
        bodyStyle
        capBodyStyle
        capCode
        capId
        configId
        derivativeId
        derivativeName
        financeProfiles {
          leaseType
          maintained
          mileage
          rate
          term
          upfront
          upfrontPayment
        }
        financeType
        fuelType
        fullDescription
        initialPayment
        legacyUrl
        lqUrl
        manufacturerId
        manufacturerName
        mileage
        modelId
        modelName
        offerRanking
        onOffer
        rangeId
        rangeName
        rental
        term
        transmission
        url
        vehicleType
      }
      aggregation {
        totalVehicles
      }
    }
  }
`;

export function useSuggestionList(query: string) {
  return useLazyQuery<suggestionList, suggestionListVariables>(
    GET_SUGGESTIONS_DATA,
    {
      variables: {
        query,
      },
    },
  );
}

export function useTextSearchList(
  query: string,
  from: number,
  onCompleted?: (data: fullTextSearchVehicleList) => void,
) {
  return useLazyQuery<
    fullTextSearchVehicleList,
    fullTextSearchVehicleListVariables
  >(GET_TEXT_SEARCH_VEHICLES_DATA, {
    variables: {
      query,
      from,
    },
    onCompleted,
  });
}
