import { gql, useQuery, useMutation, ApolloError } from '@apollo/client';
import { GetStoredPersonEmail } from '../../generated/GetStoredPersonEmail';
import {
  SavePersonEmail,
  SavePersonEmailVariables,
} from '../../generated/SavePersonEmail';

export const GET_STORED_PERSON_EMAIL_QUERY = gql`
  query GetStoredPersonEmail {
    storedPersonEmail @client
  }
`;

export const SAVE_PERSON_EMAIL_MUTATION = gql`
  mutation SavePersonEmail($email: String) {
    savePersonEmail(email: $email) @client
  }
`;

export function useStoredPersonEmailQuery(
  onCompleted?: (data: GetStoredPersonEmail) => void,
  onError?: (error: ApolloError) => void,
) {
  return useQuery<GetStoredPersonEmail>(GET_STORED_PERSON_EMAIL_QUERY, {
    ssr: false,
    onCompleted,
    onError,
  });
}

export function useSavePersonEmailMutation(
  onCompleted?: (data: SavePersonEmail) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<SavePersonEmail, SavePersonEmailVariables>(
    SAVE_PERSON_EMAIL_MUTATION,
    {
      onCompleted,
      onError,
    },
  );
}
