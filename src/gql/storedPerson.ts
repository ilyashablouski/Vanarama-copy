import { gql, useQuery, useMutation } from '@apollo/client';
import { GetStoredPerson } from '../../generated/GetStoredPerson';
import { SavePerson, SavePersonVariables } from '../../generated/SavePerson';

export const GET_STORED_PERSON_QUERY = gql`
  query GetStoredPerson {
    storedPerson @client {
      uuid
      firstName
      lastName
      partyUuid
      emailAddresses {
        value
        partyId
      }
    }
  }
`;

export const SAVE_PERSON_MUTATION = gql`
  mutation SavePerson($person: PersonInputObject) {
    savePerson(person: $person) @client {
      uuid
      firstName
      lastName
      partyUuid
      emailAddresses {
        value
        partyId
      }
    }
  }
`;

export function useStoredPersonQuery() {
  return useQuery<GetStoredPerson>(GET_STORED_PERSON_QUERY);
}

export function useSavePersonMutation() {
  return useMutation<SavePerson, SavePersonVariables>(SAVE_PERSON_MUTATION);
}
