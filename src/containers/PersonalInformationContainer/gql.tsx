import { useMutation, useQuery, gql } from '@apollo/client';

import {
  CreateUpdatePersonMutation as Mutation,
  CreateUpdatePersonMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdatePersonMutation';
import PersonalInformation from '../../components/PersonalInformation/PersonalInformation';

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      ...PersonalInformationForm
    }
  }
`;

export const GET_ABOUT_YOU_DATA = gql`
  query getPersonalInformation($uuid: ID!) {
    partyByUuid(uuid: $uuid) {
      uuid
      person {
        firstName
        lastName
      }
      emailAddresses {
        primary
        value
      }
      telephoneNumbers {
        primary
        value
      }
      addresses {
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

export function usePersonalInformationData(personByUuid?: string) {
  return useQuery(GET_ABOUT_YOU_DATA, {
    variables: {
      /**
       * If there's not a personUuid then we can set it to anything
       * as it will be excluded from the query anyway
       */
      uuid: personByUuid || '🐔',
    },
  });
}

export function useCreatePerson(onCompleted: (data: Mutation) => void) {
  return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_PERSON, {
    onCompleted,
  });
}
