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
  FinanceTypeEnum,
  ProductDerivativeFilter,
  ProductDerivativeSort,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { DEFAULT_SORT } from '../GlobalSearchPageContainer/helpers';
import { RESULTS_PER_REQUEST } from '../SearchPageContainer/helpers';

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
    $sort: [ProductDerivativeSort]
  ) {
    productDerivatives(
      query: $query
      size: $size
      from: $from
      filters: $filters
      sort: $sort
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
  onCompleted?: (data: GlobalSearchCardsData) => void,
  capIds?: string[],
  vehicleType?: VehicleTypeEnum,
) {
  return useLazyQuery<GlobalSearchCardsData, GlobalSearchCardsDataVariables>(
    GET_CARDS_DATA,
    {
      variables: {
        capIds: capIds || [],
        vehicleType,
      },
      onCompleted,
      fetchPolicy: 'network-only',
    },
  );
}

export function useTextSearchList(
  query: string,
  onCompleted: (data: productDerivatives) => void,
  from?: number,
  isPersonal?: boolean,
  onOffer?: boolean,
  filters?: ProductDerivativeFilter,
  sort?: ProductDerivativeSort[],
) {
  return useLazyQuery<productDerivatives, productDerivativesVariables>(
    GET_PRODUCT_DERIVATIVES,
    {
      variables: {
        query,
        from: from || 0,
        size: RESULTS_PER_REQUEST,
        filters: {
          ...filters,
          financeTypes: isPersonal
            ? [FinanceTypeEnum.PCH]
            : [FinanceTypeEnum.BCH],
          onOffer: onOffer || null,
        },
        sort: sort || DEFAULT_SORT,
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
          sort: DEFAULT_SORT,
          filters: {
            financeTypes: [FinanceTypeEnum.PCH],
          },
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
