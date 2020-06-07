import { useMutation, useQuery, gql } from '@apollo/client';

import {
  CreateUpdatePersonMutation as Mutation,
  CreateUpdatePersonMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdatePersonMutation';

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      uuid
      firstName
      lastName
      emailAddresses {
        primary
        value
      }
      telephoneNumbers {
        primary
        value
      }
      addresses {
        kind
        serviceId
        lineOne
        lineTwo
        lineThree
        city
        postcode
        country
      }
    }
  }
`;

export const GET_PERSON_INFORMATION_DATA = gql`
  query getPersonalInformation($uuid: ID!) {
    partyByUuid(uuid: $uuid) {
      uuid
      person {
        uuid
        firstName
        lastName
      }
      emailAddresses {
        uuid
        primary
        value
      }
      telephoneNumbers {
        uuid
        primary
        value
      }
      addresses {
        uuid
        serviceId
        lineOne
        lineTwo
        lineThree
        city
        kind
        postcode
        country
      }
    }
  }
`;

export function usePersonalInformationData(personByUuid?: string) {
  return useQuery(GET_PERSON_INFORMATION_DATA, {
    variables: {
      uuid: personByUuid || '🐔',
    },
  });
}

export function useCreatePerson(onCompleted: (data: Mutation) => void) {
  return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_PERSON, {
    onCompleted,
  });
}
