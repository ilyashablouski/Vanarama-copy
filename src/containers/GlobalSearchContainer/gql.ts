import { gql, useApolloClient, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  suggestionList,
  suggestionListVariables,
} from '../../../generated/suggestionList';
import {
  productDerivatives,
  productDerivativesVariables,
  productDerivatives_productDerivatives_derivatives,
} from '../../../generated/productDerivatives';
import {
  GlobalSearchCardsData,
  GlobalSearchCardsDataVariables,
} from '../../../generated/GlobalSearchCardsData';
import {
  ProductDerivativeFilter,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';

export const GET_SUGGESTIONS_DATA = gql`
  query suggestionList($query: String) {
    suggestionList(query: $query, pagination: { size: 5, from: 0 }) {
      suggestions
    }
  }
`;

export const GET_PRODUCT_DERIVATIVES = gql`
  query productDerivatives(
    $query: String
    $from: Int
    $size: Int
    $filters: ProductDerivativeFilter
  ) {
    productDerivatives(
      query: $query
      sort: [
        { field: offerRanking, direction: ASC }
        { field: rental, direction: ASC }
      ]
      size: $size
      from: $from
      filters: $filters
    ) {
      total
      derivatives {
        alloys
        availability
        capBodyStyle
        capCode
        capId
        derivativeId
        derivativeName
        doors
        enginePowerBhp
        enginePowerKw
        engineSize
        engineTorque
        financeType
        fuelType
        fullDescription
        fullPrice
        funder
        height
        inStock
        indexedAt
        initialPayment
        initialPaymentMaintained
        initialPeriod
        insuranceGroup
        introducedAt
        inventoryCount
        length
        loadLength
        loadWidth
        lqBodyStyle
        lqFunderId
        lqFunderRateId
        lqUrl
        lqVehicleId
        maintenancePrice
        manufacturerId
        manufacturerName
        mileage
        modelId
        modelName
        modelYear
        noOfGears
        noOfSeats
        offerRanking
        onOffer
        rangeId
        rangeName
        receivedAt
        rental
        rentalMaintained
        sku
        stockBatchId
        term
        topSpeed
        totalLeaseCost
        totalLeaseCostMaintained
        towingCapacity
        transmission
        updatedAt
        url
        vehicleCategory
        vehicleType
        weight
        wheelbase
        width
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
  onCompleted?: (data: productDerivatives) => void,
  filters?: ProductDerivativeFilter,
) {
  return useLazyQuery<productDerivatives, productDerivativesVariables>(
    GET_PRODUCT_DERIVATIVES,
    {
      variables: {
        query,
        from,
        size: 12,
        filters,
      },
      onCompleted,
    },
  );
}

export interface IGlobalSearchData {
  suggestsList: string[];
  vehiclesList: productDerivatives_productDerivatives_derivatives[];
  totalCount: number;
}

export function useGlobalSearch(query?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<IGlobalSearchData>({
    suggestsList: [],
    vehiclesList: [],
    totalCount: 0,
  });
  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    async function fetchData(value: string) {
      const { data } = await apolloClient.query<
        productDerivatives,
        productDerivativesVariables
      >({
        query: GET_PRODUCT_DERIVATIVES,
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
        vehiclesList:
          (data?.productDerivatives
            ?.derivatives as productDerivatives_productDerivatives_derivatives[]) ||
          [],
        totalCount: data?.productDerivatives?.total ?? 0,
      };
    }

    if (query?.length) {
      fetchData(query)
        .then(setSuggestions)
        .catch(() =>
          setSuggestions({
            suggestsList: [],
            vehiclesList: [],
            totalCount: 0,
          }),
        );
    } else {
      setSuggestions({
        suggestsList: [],
        vehiclesList: [],
        totalCount: 0,
      });
    }
  }, [apolloClient, query]);

  return suggestions;
}
