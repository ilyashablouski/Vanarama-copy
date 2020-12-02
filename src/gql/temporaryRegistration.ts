import { useMutation, gql, FetchResult } from '@apollo/client';
import {
  RegisterForTemporaryAccess,
  RegisterForTemporaryAccessVariables,
  RegisterForTemporaryAccess_registerForTemporaryAccess_emailAddress as IEmailAddress,
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
      isSuccessfull
      emailAddress {
        uuid
        value
        kind
      }
    }
  }
`;

export function useRegistrationForTemporaryAccessMutation() {
  return useMutation<
    RegisterForTemporaryAccess,
    RegisterForTemporaryAccessVariables
  >(REGISTER_FOR_TEMPORARY_ACCESS_MUTATION);
}
export const handlerMock = (
  emailAddress?: IEmailAddress | null,
): Promise<FetchResult<RegisterForTemporaryAccess>> =>
  Promise.resolve({
    data: {
      registerForTemporaryAccess: emailAddress
        ? {
            emailAddress,
            accessToken: null,
            isSuccessfull: true,
          }
        : null,
    },
  });
