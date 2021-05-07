import { gql, useApolloClient, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  suggestionList,
  suggestionListVariables,
} from '../../../generated/suggestionList';
import {
  fullTextSearchVehicleList,
  fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles,
  fullTextSearchVehicleListVariables,
} from '../../../generated/fullTextSearchVehicleList';

export const GET_SUGGESTIONS_DATA = gql`
  query suggestionList($query: String) {
    suggestionList(query: $query, pagination: { size: 6, from: 0 }) {
      suggestions
    }
  }
`;

export const GET_TEXT_SEARCH_VEHICLES_DATA = gql`
  query fullTextSearchVehicleList($query: String, $from: Int, $size: Int) {
    fullTextSearchVehicleList(
      query: $query
      sort: [
        { field: offer_ranking, direction: ASC }
        { field: rental, direction: ASC }
      ]
      pagination: { size: $size, from: $from }
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
      size: 12,
    },
    onCompleted,
  });
}

export function useGlobalSearch(query?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<
    fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles[]
  >([]);
  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    async function fetchData(value: string) {
      const { data } = await apolloClient.query<
        fullTextSearchVehicleList,
        fullTextSearchVehicleListVariables
      >({
        query: GET_TEXT_SEARCH_VEHICLES_DATA,
        variables: {
          query: value,
          from: 0,
          size: 6,
        },
      });
      return data?.fullTextSearchVehicleList?.vehicles || [];
    }

    if (query?.length) {
      fetchData(query)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [apolloClient, query]);

  return suggestions;
}
