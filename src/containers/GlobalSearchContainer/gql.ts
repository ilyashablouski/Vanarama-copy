import {
  ApolloClient,
  gql,
  NormalizedCacheObject,
  useApolloClient,
  useLazyQuery,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import router from 'next/router';
import Cookies from 'js-cookie';
import {
  suggestionList,
  suggestionListVariables,
  suggestionList_suggestionListV3,
} from '../../../generated/suggestionList';
import {
  productDerivatives as IProductDerivativesQuery,
  productDerivatives,
  productDerivatives_productDerivatives_derivatives as IVehiclesList,
  productDerivatives_productDerivatives_derivatives,
  productDerivativesVariables,
} from '../../../generated/productDerivatives';
import {
  GlobalSearchCardsData,
  GlobalSearchCardsData_productCard as ICardsData,
  GlobalSearchCardsDataVariables,
} from '../../../generated/GlobalSearchCardsData';
import {
  FinanceType,
  ProductDerivativeFilter,
  ProductDerivativeSort,
  VehicleTypeEnum,
} from '../../../generated/globalTypes';
import { DEFAULT_SORT } from '../GlobalSearchPageContainer/helpers';
import { RESULTS_PER_REQUEST } from '../SearchPageContainer/helpers';
import { Nullable } from '../../types/common';
import {
  getPartnerProperties,
  mapPartnerVehicleTypes,
  PARTNER_COOKIE_NAME,
} from '../../utils/partnerProperties';
import { IGSVehiclesCardsData } from './interfaces';

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
    suggestionListV3(query: $query) {
      vehicles
      vehicleCategories
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
      freeInsurance
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

export const fetchProductCardsData = async (
  client: ApolloClient<NormalizedCacheObject | object>,
  capIds: string[],
  vehicleType: VehicleTypeEnum,
) => {
  const { data: productCardsData } = await client.query<
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
};

export const getVehiclesCardsData = async (
  client: ApolloClient<NormalizedCacheObject | object>,
  vehiclesList: Nullable<IVehiclesList>[],
): Promise<IGSVehiclesCardsData<ICardsData[]>> => {
  const responseCarsCapIds = vehiclesList
    ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.CAR)
    .map(vehicle => `${vehicle?.derivativeId}`);
  const responseVansCapIds = vehiclesList
    ?.filter(vehicle => vehicle?.vehicleType === VehicleTypeEnum.LCV)
    .map(vehicle => `${vehicle?.derivativeId}`);
  const [carsProductCards, vansProductCards] = await Promise.all([
    responseCarsCapIds?.length
      ? fetchProductCardsData(client, responseCarsCapIds, VehicleTypeEnum.CAR)
      : undefined,
    responseVansCapIds?.length
      ? fetchProductCardsData(client, responseVansCapIds, VehicleTypeEnum.LCV)
      : undefined,
  ]);

  return {
    LCV: (vansProductCards as ICardsData[]) ?? [],
    CAR: (carsProductCards as ICardsData[]) ?? [],
  };
};

/**
 * Get a list of vehicles depending on the input query
 */
const getSuggestionList = (
  searchString: string,
  suggestions: suggestionList_suggestionListV3 | null,
) => {
  if (!suggestions) {
    return [];
  }

  const { vehicles, vehicleCategories } = suggestions;
  const vehicle = [
    ...new Set(
      searchString
        .toLowerCase()
        .split(' ')
        .filter(Boolean),
    ),
  ];

  const isModel = vehicleCategories?.some(value =>
    value?.toLowerCase().includes(vehicle[0]),
  );

  if (vehicle.length > 1 || !isModel) {
    return vehicles;
  }

  return vehicleCategories;
};

export function useGlobalSearch(query?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<IGlobalSearchData>({
    suggestsList: [],
    vehiclesList: [],
  });
  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    let derivativesFilters: ProductDerivativeFilter = {
      financeTypes: [FinanceType.PCH],
    };
    // if partnerships journey
    if (
      router.pathname.includes('partnerships') ||
      !!Cookies.get(PARTNER_COOKIE_NAME)
    ) {
      const partnerDetails = getPartnerProperties();
      derivativesFilters = {
        ...derivativesFilters,
        vehicleCategory: mapPartnerVehicleTypes(partnerDetails?.vehicleTypes),
        fuelTypes: partnerDetails?.fuelTypes,
      };
    }

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
            filters: derivativesFilters,
          },
        }),
      ]);

      const resultVehicles = getSuggestionList(
        value,
        suggestsList?.data?.suggestionListV3,
      );

      return {
        suggestsList: (resultVehicles as string[])?.slice(0, 5) || [],
        vehiclesList:
          (vehiclesList?.data.productDerivatives
            ?.derivatives as productDerivatives_productDerivatives_derivatives[]) ||
          [],
      };
    }

    if (query?.length) {
      fetchSuggestionsData(query)
        .then(async suggestionsData => {
          const vehiclesCardsData = await getVehiclesCardsData(
            apolloClient,
            suggestionsData.vehiclesList || [],
          );

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
