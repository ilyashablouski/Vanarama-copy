import { gql, useQuery } from '@apollo/client';

export interface ISessionState {
  isSessionFinished: boolean | null;
}

export interface ISSRAuthStatus {
  isSSRAuthError: boolean | null;
}

export const GET_SESSION_STATE = gql`
  query GetSessionState {
    isSessionFinished @client
  }
`;

export const GET_SSR_AUTH_STATUS = gql`
  query GetAuthStatus {
    isSSRAuthError @client
  }
`;

export default function useSessionState() {
  return useQuery<ISessionState>(GET_SESSION_STATE);
}

export function useSSRAuthStatus() {
  return useQuery<ISSRAuthStatus>(GET_SSR_AUTH_STATUS);
}
