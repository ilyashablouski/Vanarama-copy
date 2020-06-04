import { useMutation, useQuery, gql } from '@apollo/client';

import {
  CreateUpdatePersonMutation as Mutation,
  CreateUpdatePersonMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdatePersonMutation';
import {
  GetAboutYouDataQuery,
  GetAboutYouDataQueryVariables,
} from '../../../generated/GetAboutYouDataQuery';
import PersonalInformarion from '../../components/PersonalInformation/PersonalInformation';

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      ...AboutFormPerson
    }
  }
  ${PersonalInformarion.fragments.person}
`;

export const GET_ABOUT_YOU_DATA = gql`
  query GetAboutYouDataQuery($uuid: ID!, $includePerson: Boolean!) {
    allDropDowns {
      ...AboutFormDropdownData
    }
    personByUuid(uuid: $uuid) @include(if: $includePerson) {
      ...AboutFormPerson
    }
  }
  ${PersonalInformarion.fragments.dropdownData}
  ${PersonalInformarion.fragments.person}
`;

export function useAboutYouData(personByUuid?: string) {
  return useQuery<GetAboutYouDataQuery, GetAboutYouDataQueryVariables>(
    GET_ABOUT_YOU_DATA,
    {
      variables: {
        /**
         * If there's not a personUuid then we can set it to anything
         * as it will be excluded from the query anyway
         */
        uuid: personByUuid || '🐔',
        includePerson: Boolean(personByUuid),
      },
    },
  );
}

export function useCreatePerson(onCompleted: (data: Mutation) => void) {
  return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_PERSON, {
    onCompleted,
  });
}
