import { gql, useMutation, useQuery } from '@apollo/client';
import {
  UpdateMyAccountDetails,
  UpdateMyAccountDetailsVariables,
} from '../../../generated/UpdateMyAccountDetails';
import { MyAccount, MyAccountVariables } from '../../../generated/MyAccount';

export const CREATE_UPDATE_PERSON = gql`
  mutation UpdateMyAccountDetails($input: MyAccountInputObject!) {
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
  query MyAccount($personUuid: String!) {
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
  return useQuery<MyAccount, MyAccountVariables>(GET_PERSON_INFORMATION_DATA, {
    variables: {
      personUuid: personUuid || '',
    },
  });
}

export function useCreatePerson() {
  return useMutation<UpdateMyAccountDetails, UpdateMyAccountDetailsVariables>(
    CREATE_UPDATE_PERSON,
  );
}
