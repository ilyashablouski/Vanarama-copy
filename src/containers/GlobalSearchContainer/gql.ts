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
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import { Nullable } from '../../types/common';

export const GET_SUGGESTIONS_DATA = gql`
  query suggestionList($query: String) {
    suggestionList(query: $query, pagination: { size: 5, from: 0 }) {
      suggestions
    }
  }
`;

export const GET_PRODUCT_DERIVATIVES = gql`
  query productDerivatives($query: String, $from: Int, $size: Int) {
    productDerivatives(
      query: $query
      sort: [
        { field: offerRanking, direction: ASC }
        { field: rental, direction: ASC }
      ]
      size: $size
      from: $from
    ) {
      total
      derivatives {
        alloys
        availability
        cap_body_style
        cap_code
        cap_id
        config_id
        derivative_id
        derivative_name
        doors
        engine_power_bhp
        engine_power_kw
        engine_size
        engine_torque
        finance_type
        fuel_type
        full_description
        full_price
        funder
        height
        in_stock
        indexed_at
        initial_payment
        initial_payment_maintained
        initial_period
        insurance_group
        introduced_at
        inventory_count
        length
        load_length
        load_width
        lq_body_style
        lq_funder_id
        lq_funder_rate_id
        lq_url
        lq_vehicle_id
        maintenance_price
        manufacturer_id
        manufacturer_name
        mileage
        model_id
        model_name
        model_year
        no_of_gears
        no_of_seats
        offer_ranking
        on_offer
        range_id
        range_name
        received_at
        rental
        rental_maintained
        sku
        stock_batch_id
        term
        top_speed
        total_lease_cost
        total_lease_cost_maintained
        towing_capacity
        transmission
        updated_at
        url
        vehicle_category
        vehicle_type
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
) {
  return useLazyQuery<productDerivatives, productDerivativesVariables>(
    GET_PRODUCT_DERIVATIVES,
    {
      variables: {
        query,
        from,
        size: 12,
      },
      onCompleted,
    },
  );
}

export interface IGlobalSearchData {
  suggestsList: string[];
  vehiclesList: Nullable<productDerivatives_productDerivatives_derivatives>[];
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
        vehiclesList: data?.productDerivatives?.derivatives || [],
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
