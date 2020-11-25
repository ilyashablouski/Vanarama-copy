import { useMutation, gql, FetchResult } from '@apollo/client';
import {
  RegisterForTemporaryAccess,
  RegisterForTemporaryAccessVariables,
} from '../../generated/RegisterForTemporaryAccess';

export const REGISTER_FOR_TEMPORARY_ACCESS_MUTATION = gql`
  mutation RegisterForTemporaryAccess(
    $username: String!
    $firstName: String!
    $lastName: String!
  ) {
    registerForTemporaryAccess(
      username: $username
      firstName: $firstName
      lastName: $lastName
    ) {
      accessToken
    }
  }
`;

export function useRegistrationForTemporaryAccessMutation() {
  return useMutation<
    RegisterForTemporaryAccess,
    RegisterForTemporaryAccessVariables
  >(REGISTER_FOR_TEMPORARY_ACCESS_MUTATION);
}
export const handlerMock = (): Promise<FetchResult<
  RegisterForTemporaryAccess
>> =>
  Promise.resolve({
    data: {
      registerForTemporaryAccess: null,
    },
  });
