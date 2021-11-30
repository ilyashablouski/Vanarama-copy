import {
  gql,
  useMutation,
  ApolloError,
  ApolloClient,
  NormalizedCacheObject,
} from '@apollo/client';
import { GetStoredPersonEmail } from '../../generated/GetStoredPersonEmail';
import {
  SavePersonEmail,
  SavePersonEmailVariables,
} from '../../generated/SavePersonEmail';
import { DeletePersonEmail } from '../../generated/DeletePersonEmail';

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

export const DELETE_PERSON_EMAIL_MUTATION = gql`
  mutation DeletePersonEmail {
    deletePersonEmail @client
  }
`;

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

export function getStoredPersonEmail(
  client: ApolloClient<NormalizedCacheObject | object>,
) {
  return client
    .query<GetStoredPersonEmail>({
      query: GET_STORED_PERSON_EMAIL_QUERY,
    })
    .then(operation => operation.data?.storedPersonEmail)
    .catch(() => null);
}

export function useDeletePersonEmailMutation(
  onCompleted?: (mutationResult: DeletePersonEmail) => void,
  onError?: (error: ApolloError) => void,
) {
  return useMutation<DeletePersonEmail>(DELETE_PERSON_EMAIL_MUTATION, {
    onCompleted,
    onError,
  });
}
