import { useQuery, gql, useLazyQuery, useApolloClient } from '@apollo/client';
import { VehicleTypeEnum } from '../../../generated/globalTypes';
import {
  GetProductCard,
  GetProductCardVariables,
} from '../../../generated/GetProductCard';
import { useEffect, useState } from 'react';
import { Query } from '@testing-library/react';

export const GET_COMPANY_PROFILE = gql`
  query companyProfile($companyNumber: String!) {
    companyProfile(companyNumber: $companyNumber) {
        sicCodes
    }
  }
`;

/**
 *  @param companyNumber - string with company number
 */
export function useCompanyProfile(
    companyNumber: string,
) {
  return useLazyQuery<any, any>(
    GET_COMPANY_PROFILE,
    {
      variables: {
        companyNumber,
      },
    },
  );
}

export const GET_SIC_CODES = gql`
query sicCodes {
    sicCodes{
      sicData{
        sicCode
          description
      }
    }
  }
`;

export function useSicCodes(searchTerm?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState([]);

  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    async function fetchData(value: string) {
      const { data } = await apolloClient.query<any, any>({
        query: GET_SIC_CODES,
        variables: {
          searchTerm: value,
        },
      });

      return (data?.searchCompanies?.nodes || []);
    }

    if (searchTerm && searchTerm.length > 2) {
      fetchData(searchTerm)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [apolloClient, searchTerm]);

  return suggestions;
}