import { gql, useApolloClient, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  suggestionList,
  suggestionListVariables,
} from '../../../generated/suggestionList';
import {
  productDerivatives as IProductDerivativesQuery,
  productDerivatives,
  productDerivatives_productDerivatives_derivatives,
  productDerivativesVariables,
} from '../../../generated/productDerivatives';
import {
  GlobalSearchCardsData,
  GlobalSearchCardsDataVariables,
  GlobalSearchCardsData_productCard as ICardsData,
} from '../../../generated/GlobalSearchCardsData';
import {
  FinanceType,
  ProductDerivativeFilter,
  ProductDerivativeSort,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { DEFAULT_SORT } from '../GlobalSearchPageContainer/helpers';
import { RESULTS_PER_REQUEST } from '../SearchPageContainer/helpers';

export interface IGSVehiclesCardsData<T> {
  LCV: T;
  CAR: T;
}

export const PRODUCT_DERIVATIVE = gql`
  fragment productDerivative on ProductDerivative {
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
`;

export const GET_SUGGESTIONS_DATA = gql`
  query suggestionList($query: String) {
    suggestionListV2(query: $query, pagination: { size: 6 }) {
      suggestions
    }
  }
`;

export const GET_PRODUCT_DERIVATIVES = gql`
  ${PRODUCT_DERIVATIVE}
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
        ...productDerivative
      }
    }
  }
`;

export const GET_CARDS_DATA = gql`
  query GlobalSearchCardsData($capIds: [ID!]!, $vehicleType: VehicleTypeEnum) {
    productCard(capIds: $capIds, vehicleType: $vehicleType) {
      averageRating
      isOnOffer
      leadTime
      capId
      imageUrl
      vehicleType
      personalRate
      businessRate
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
  query: string | undefined,
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
        query: query || undefined,
        from: from || 0,
        size: RESULTS_PER_REQUEST,
        filters: {
          ...filters,
          financeTypes: isPersonal ? [FinanceType.PCH] : [FinanceType.BCH],
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
}

export function useGlobalSearch(query?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<IGlobalSearchData>({
    suggestsList: [],
    vehiclesList: [],
  });
  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    async function fetchSuggestionsData(value: string) {
      const [suggestsList, vehiclesList] = await Promise.all([
        apolloClient.query<suggestionList, suggestionListVariables>({
          query: GET_SUGGESTIONS_DATA,
          variables: {
            query: value,
          },
        }),
        apolloClient.query<
          IProductDerivativesQuery,
          productDerivativesVariables
        >({
          query: GET_PRODUCT_DERIVATIVES,
          variables: {
            query: value,
            from: 0,
            size: 6,
            sort: DEFAULT_SORT,
            filters: {
              financeTypes: [FinanceType.PCH],
            },
          },
        }),
      ]);
      return {
        suggestsList:
          (suggestsList?.data.suggestionListV2?.suggestions as string[])?.slice(
            0,
            5,
          ) || [],
        vehiclesList:
          (vehiclesList?.data.productDerivatives
            ?.derivatives as productDerivatives_productDerivatives_derivatives[]) ||
          [],
      };
    }

    async function fetchProductCardsData(
      capIds: string[],
      vehicleType: VehicleTypeEnum,
    ) {
      const { data: productCardsData } = await apolloClient.query<
        GlobalSearchCardsData,
        GlobalSearchCardsDataVariables
      >({
        query: GET_CARDS_DATA,
        variables: {
          capIds,
          vehicleType,
        },
      });
      return productCardsData.productCard;
    }

    if (query?.length) {
      fetchSuggestionsData(query)
        .then(suggestionsData => {
          const responseCarsCapIds = suggestionsData.vehiclesList
            ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.CAR)
            .map(vehicle => `${vehicle?.derivativeId}`);
          const responseVansCapIds = suggestionsData.vehiclesList
            ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.LCV)
            .map(vehicle => `${vehicle?.derivativeId}`);

          Promise.all([
            responseCarsCapIds.length
              ? fetchProductCardsData(responseCarsCapIds, VehicleTypeEnum.CAR)
              : undefined,
            responseVansCapIds.length
              ? fetchProductCardsData(responseVansCapIds, VehicleTypeEnum.LCV)
              : undefined,
          ]).then(([carsProductCards, vansProductCards]) => {
            const vehiclesCardsData: IGSVehiclesCardsData<ICardsData[]> = {
              LCV: (vansProductCards as ICardsData[]) ?? [],
              CAR: (carsProductCards as ICardsData[]) ?? [],
            };

            const getProductCardData = (
              capId: string,
              vehicleType: VehicleTypeEnum,
            ) => {
              return vehiclesCardsData[vehicleType].find(
                vehicle => vehicle?.capId === capId,
              );
            };

            const resultSuggestions = {
              ...suggestionsData,
              vehiclesList: suggestionsData.vehiclesList.map(vehicleData => {
                const vehicleCard = getProductCardData(
                  `${vehicleData.capId}`,
                  (vehicleData.vehicleType as VehicleTypeEnum) ??
                    VehicleTypeEnum.CAR,
                );
                return {
                  ...vehicleData,
                  rental: vehicleCard?.personalRate ?? null,
                  onOffer: vehicleCard?.isOnOffer ?? false,
                };
              }),
            };

            setSuggestions(resultSuggestions);
          });
        })
        .catch(() => {
          setSuggestions({
            suggestsList: [],
            vehiclesList: [],
          });
        });
    } else {
      setSuggestions({
        suggestsList: [],
        vehiclesList: [],
      });
    }
  }, [apolloClient, query]);

  return suggestions;
}
