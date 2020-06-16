import { useEffect, useState } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import {
  SearchCompaniesQuery as Query,
  SearchCompaniesQueryVariables as QueryVariables,
  SearchCompaniesQuery_searchCompanies_nodes as SearchResult,
} from '../../../generated/SearchCompaniesQuery';

export const SEARCH_COMPANIES = gql`
  query SearchCompaniesQuery($searchTerm: String!) {
    searchCompanies(search: $searchTerm, first: 10) {
      nodes {
        title
        companyNumber
        addressSnippet
        dateOfCreation
        companyStatus
      }
    }
  }
`;

export default function useSearchCompanies(searchTerm?: string) {
  const apolloClient = useApolloClient();
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);

  // This effect runs when the debounced search term changes and executes the search
  useEffect(() => {
    async function fetchData(value: string) {
      const { data } = await apolloClient.query<Query, QueryVariables>({
        query: SEARCH_COMPANIES,
        variables: {
          searchTerm: value,
        },
      });

      return (
        data?.searchCompanies?.nodes || []
      ).filter((_): _ is SearchResult => Boolean(_));
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
