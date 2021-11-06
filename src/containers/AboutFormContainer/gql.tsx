import { useMutation, useQuery, gql } from '@apollo/client';
import {
  CreateUpdatePersonMutation,
  CreateUpdatePersonMutationVariables,
} from '../../../generated/CreateUpdatePersonMutation';
import {
  GetAboutYouDataQuery,
  GetAboutYouDataQueryVariables,
} from '../../../generated/GetAboutYouDataQuery';
import { GetAboutYouPageQuery } from '../../../generated/GetAboutYouPageQuery';
import AboutForm from '../../components/AboutForm';

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      ...AboutFormPerson
    }
  }
  ${AboutForm.fragments.person}
`;

export const GET_ABOUT_YOU_DATA = gql`
  query GetAboutYouDataQuery($uuid: ID!) {
    personByUuid(uuid: $uuid) {
      ...AboutFormPerson
    }
  }
  ${AboutForm.fragments.person}
`;

export const GET_ABOUT_YOU_PAGE_DATA = gql`
  query GetAboutYouPageQuery {
    allDropDowns {
      ...AboutFormDropdownData
    }
  }
  ${AboutForm.fragments.dropdownData}
`;

export function useAboutPageDataQuery() {
  return useQuery<GetAboutYouPageQuery>(GET_ABOUT_YOU_PAGE_DATA, {
    fetchPolicy: 'no-cache',
  });
}

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
      },
      fetchPolicy: 'no-cache',
      skip: !personByUuid,
    },
  );
}

export function useCreatePerson(
  onCompleted?: (data: CreateUpdatePersonMutation) => void,
) {
  return useMutation<
    CreateUpdatePersonMutation,
    CreateUpdatePersonMutationVariables
  >(CREATE_UPDATE_PERSON, {
    onCompleted,
  });
}
