import { ApolloError, gql, useQuery } from '@apollo/client';
import { PERSON_DATA_FRAGMENT } from '../containers/LoginFormContainer/gql';
import { GetStoredOLAFData } from '../../generated/GetStoredOLAFData';

export const GET_STORED_OLAF_DATA = gql`
  query GetStoredOLAFData {
    storedPerson @client {
      ...PersonData
    }
    storedOrder @client {
      order
      rating
    }
    storedPersonUuid @client
    storedPersonEmail @client
  }
  ${PERSON_DATA_FRAGMENT}
`;

export function useStoredOLAFDataQuery(
  onCompleted?: (data: GetStoredOLAFData) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredOLAFData>(GET_STORED_OLAF_DATA, {
    ssr: false,
    fetchPolicy: 'no-cache',
    onCompleted,
    onError,
  });
}
