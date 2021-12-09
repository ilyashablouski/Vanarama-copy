import { gql, useQuery } from '@apollo/client';
import { GetSessionState } from '../../generated/GetSessionState';

export const GET_SESSION_STATE = gql`
  query GetSessionState {
    isSessionFinished @client
  }
`;

export default function useSessionState() {
  return useQuery<GetSessionState>(GET_SESSION_STATE);
}
