import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AllDropDownsQuery } from '../../../generated/AllDropDownsQuery';
import {
  CreateUpdatePersonMutation as Mutation,
  CreateUpdatePersonMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdatePersonMutation';
import AboutForm from '../../components/AboutForm';

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation($input: PersonInputObject!) {
    createUpdatePerson(input: $input) {
      ...AboutFormPerson
    }
  }
  ${AboutForm.fragments.person}
`;

export const ALL_DROPDOWNS = gql`
  query AllDropDownsQuery {
    allDropDowns {
      ...AboutFormDropdownData
    }
  }
  ${AboutForm.fragments.dropdownData}
`;

export function useDropdowns() {
  return useQuery<AllDropDownsQuery>(ALL_DROPDOWNS);
}

export function useCreatePerson(onCompleted: (data: Mutation) => void) {
  return useMutation<Mutation, MutationVariables>(CREATE_UPDATE_PERSON, {
    onCompleted,
  });
}
