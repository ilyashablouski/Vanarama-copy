import { useMutation, useQuery, gql } from '@apollo/client';

import {
  CreateUpdatePersonMutation as Mutation,
  CreateUpdatePersonMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdatePersonMutation';
import {
  GetAboutYouDataQuery,
  GetAboutYouDataQueryVariables,
} from '../../../generated/GetAboutYouDataQuery';
import AboutForm from '../../components/PersonalInformation/AboutForm';

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      ...AboutFormPerson
    }
  }
  ${AboutForm.fragments.person}
`;

export const GET_ABOUT_YOU_DATA = gql`
  query getPersonalInformation($uuid: ID!) {
    getPersonalInformation(uuid: $uuid) {
      uuid
      person {
        title
        firstName
        lastName
      }
      emailAddresses {
        kind
        primary
        value
      }
      telephoneNumbers {
        kind
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
        postcode
        country
      }
    }
  }
`;

export function useAboutYouData(personByUuid?: string) {
  return useQuery(
    GET_ABOUT_YOU_DATA,
    {
      variables: {
        /**
         * If there's not a personUuid then we can set it to anything
         * as it will be excluded from the query anyway
         */
        uuid: personByUuid || '🐔',
      },
    },
  );
}

export function useCreatePerson(onCompleted: (data: Mutation) => void) {
  return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_PERSON, {
    onCompleted,
  });
}
