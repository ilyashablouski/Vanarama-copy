import { gql, useMutation, useQuery } from '@apollo/client';
import {
  CreateUpdatePersonalInformationMutation as Mutation,
  CreateUpdatePersonalInformationMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdatePersonalInformationMutation';

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonalInformationMutation($input: PersonInputObject!) {
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
        uuid
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

export function usePersonalInformationData(personByUuid: string) {
  return useQuery(GET_PERSON_INFORMATION_DATA, {
    variables: {
      uuid: personByUuid,
    },
  });
}

export function useCreatePerson() {
  return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_PERSON);
}
