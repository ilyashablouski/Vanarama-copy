import { gql, useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react';

import {
  OccupationsListData,
  OccupationsListDataVariables,
} from '../../../generated/OccupationsListData';

export const GET_OCCUPATIONS = gql`
  query OccupationsListData($value: String!) {
    occupationList(occupation: $value) {
      occupations
    }
  }
`;

export function useOccupationList(searchTerm?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    async function fetchData(value: string) {
      const { data } = await apolloClient.query<
        OccupationsListData,
        OccupationsListDataVariables
      >({
        query: GET_OCCUPATIONS,
        variables: {
          value,
        },
      });
      return data?.occupationList?.occupations || [];
    }

    if (searchTerm && searchTerm.length > 0) {
      fetchData(searchTerm)
        .then(setSuggestions)
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  }, [apolloClient, searchTerm]);

  return suggestions;
}
