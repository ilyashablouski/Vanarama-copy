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
      uuid
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
  uuid: string | null,
  emailAddress?: IEmailAddress | null,
): Promise<FetchResult<RegisterForTemporaryAccess>> =>
  Promise.resolve({
    data: {
      registerForTemporaryAccess: emailAddress
        ? {
            uuid,
            emailAddress,
            accessToken: null,
            isSuccessfull: true,
          }
        : null,
    },
  });
