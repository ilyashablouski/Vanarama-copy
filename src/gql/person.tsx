import { useQuery, gql } from '@apollo/client';
import {
  GetPersonByUuid,
  GetPersonByUuidVariables,
} from '../../generated/GetPersonByUuid';

export const GET_PERSON_BY_UUID = gql`
  query GetPersonByUuid($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      firstName
      lastName
      partyUuid
      uuid
    }
  }
`;

export function usePersonByUuidData(uuid: string) {
  return useQuery<GetPersonByUuid, GetPersonByUuidVariables>(
    GET_PERSON_BY_UUID,
    {
      variables: {
        uuid,
      },
      skip: !uuid,
    },
  );
}
