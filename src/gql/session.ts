import { gql, useQuery } from '@apollo/client';

export interface ISessionState {
  isSessionFinished: boolean | null;
}

export const GET_SESSION_STATE = gql`
  query GetSessionState {
    isSessionFinished @client
  }
`;

export default function useSessionState() {
  return useQuery<ISessionState>(GET_SESSION_STATE);
}
