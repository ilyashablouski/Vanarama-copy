import { gql, useApolloClient, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  suggestionList,
  suggestionListVariables,
} from '../../../generated/suggestionList';
import {
  fullTextSearchVehicleList,
  fullTextSearchVehicleList_fullTextSearchVehicleList_vehicles as IFullTextSearchVehicles,
  fullTextSearchVehicleListVariables,
} from '../../../generated/fullTextSearchVehicleList';
import {
  GlobalSearchCardsData,
  GlobalSearchCardsDataVariables,
} from '../../../generated/GlobalSearchCardsData';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

export const GET_SUGGESTIONS_DATA = gql`
  query suggestionList($query: String) {
    suggestionList(query: $query, pagination: { size: 5, from: 0 }) {
      suggestions
    }
  }
`;

export const GET_TEXT_SEARCH_VEHICLES_DATA = gql`
  query fullTextSearchVehicleList($query: String, $from: Int, $size: Int) {
    fullTextSearchVehicleList(
      query: $query
      sort: [
        { field: offerRanking, direction: ASC }
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

export const GET_CARDS_DATA = gql`
  query GlobalSearchCardsData($capIds: [ID!]!, $vehicleType: VehicleTypeEnum) {
    productCard(capIds: $capIds, vehicleType: $vehicleType) {
      averageRating
      capId
      imageUrl
      vehicleType
      keyInformation {
        name
        value
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

export function useGSCardsData(
  capIds: string[],
  vehicleType: VehicleTypeEnum,
  onCompleted?: (data: GlobalSearchCardsData) => void,
) {
  return useLazyQuery<GlobalSearchCardsData, GlobalSearchCardsDataVariables>(
    GET_CARDS_DATA,
    {
      variables: {
        capIds,
        vehicleType,
      },
      onCompleted,
      fetchPolicy: 'network-only',
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

export interface IGlobalSearchData {
  suggestsList: string[];
  vehiclesList: IFullTextSearchVehicles[];
}

export function useGlobalSearch(query?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<IGlobalSearchData>({
    suggestsList: [],
    vehiclesList: [],
  });
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
      const { data: suggestsList } = await apolloClient.query<
        suggestionList,
        suggestionListVariables
      >({
        query: GET_SUGGESTIONS_DATA,
        variables: {
          query: value,
        },
      });
      return {
        suggestsList: suggestsList?.suggestionList?.suggestions || [],
        vehiclesList: data?.fullTextSearchVehicleList?.vehicles || [],
      };
    }

    if (query?.length) {
      fetchData(query)
        .then(setSuggestions)
        .catch(() => setSuggestions({ suggestsList: [], vehiclesList: [] }));
    } else {
      setSuggestions({ suggestsList: [], vehiclesList: [] });
    }
  }, [apolloClient, query]);

  return suggestions;
}
