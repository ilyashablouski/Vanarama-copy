import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { ILoqateConfig, ILoqateQuery, ILoqateSuggestion } from './interfaces';
import { createUrl, mapResponse } from './utils';

async function fetchSuggestions(query: ILoqateQuery, config: ILoqateConfig) {
  const url = createUrl(query, config);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `API request to Loqate failed with status code ${response.status}`,
    );
  }

  const json = await response.json();
  return mapResponse(json);
}

/**
 * Makes a request to the Loqate Find API to find address suggestions for a given query
 * @param query The query to execute
 * @param config The configuration for the API
 */
export default function useLoqate(query: ILoqateQuery, config: ILoqateConfig) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<ILoqateSuggestion[]>([]);

  /**
   * Run this effect each time the query text or postcode changes
   */
  useDeepCompareEffect(() => {
    // Reset the error
    setError(undefined);

    if (query.text && query.text.length > 3) {
      setLoading(true);
      fetchSuggestions(query, config)
        .then(suggestions => {
          setLoading(false);
          setData(suggestions);
        })
        .catch(err => {
          setError(err.message);
        });
    } else {
      setData([]);
    }
  }, [query, config]);

  return { data, error, loading };
}
