import { gql, useLazyQuery, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';
import {
  companyProfile,
  companyProfileVariables,
} from '../../../generated/companyProfile';
import {
  sicCodes,
  sicCodesVariables,
  sicCodes_sicCodes_sicData as ISicData,
} from '../../../generated/sicCodes';

export const GET_COMPANY_PROFILE = gql`
  query companyProfile($companyNumber: String!) {
    companyProfile(companyNumber: $companyNumber) {
      sicData {
        sicCode
        description
      }
    }
  }
`;

/**
 *  @param companyNumber - string with company number
 */
export function useCompanyProfile(companyNumber: string) {
  return useLazyQuery<companyProfile, companyProfileVariables>(
    GET_COMPANY_PROFILE,
    {
      variables: {
        companyNumber,
      },
    },
  );
}

export const GET_SIC_CODES = gql`
  query sicCodes($value: String!) {
    sicCodes(value: $value) {
      sicData {
        sicCode
        description
      }
    }
  }
`;

export function useSicCodes(searchTerm?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<ISicData[]>([]);
  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    async function fetchData(value: string) {
      const { data } = await apolloClient.query<sicCodes, sicCodesVariables>({
        query: GET_SIC_CODES,
        variables: {
          value,
        },
      });
      return data?.sicCodes?.sicData || [];
    }

    if (searchTerm && searchTerm.length) {
      fetchData(searchTerm)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [apolloClient, searchTerm]);

  return suggestions;
}
