import { gql, useMutation, useQuery } from '@apollo/client';
import {
  CreateUpdatePersonalInformationMutation as Mutation,
  CreateUpdatePersonalInformationMutationVariables as MutationVariables,
} from '../../../generated/CreateUpdatePersonalInformationMutation';

export const CREATE_UPDATE_PERSON = gql`
  mutation updateMyAccountDetails($input: MyAccountInputObject!) {
    updateMyAccountDetails(input: $input) {
      personUuid
      firstName
      lastName
      address {
        lineOne
        lineTwo
        city
        postcode
        serviceId
      }
      telephoneNumber
      emailAddress
    }
  }
`;

export const GET_PERSON_INFORMATION_DATA = gql`
  query my_account($personUuid: String!) {
    myAccountDetailsByPersonUuid(personUuid: $personUuid) {
      personUuid
      firstName
      lastName
      address {
        lineOne
        lineTwo
        city
        postcode
        serviceId
      }
      telephoneNumber
      emailAddress
    }
  }
`;

export function usePersonalInformationData(personUuid: string | undefined) {
  return useQuery(GET_PERSON_INFORMATION_DATA, {
    variables: {
      personUuid: personUuid || 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f',
    },
  });
}

export function useCreatePerson() {
  return useMutation(CREATE_UPDATE_PERSON, {
    update: (store, result) => {
      // Write our data back to the cache.
      store.writeQuery({
        query: GET_PERSON_INFORMATION_DATA,
        variables: { personUuid: 'aa08cca2-5f8d-4b8c-9506-193d9c32e05f' },
        data: {
          ...result.data,
        },
      });
    },
  });
}
