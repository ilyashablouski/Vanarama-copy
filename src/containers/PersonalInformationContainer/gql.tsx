import { gql, useMutation } from '@apollo/client';
import {
  UpdateMyAccountDetails,
  UpdateMyAccountDetailsVariables,
} from '../../../generated/UpdateMyAccountDetails';

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
      emailConsent
      smsConsent
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
      emailConsent
      smsConsent
    }
  }
`;

export function useCreatePerson(onCompleted: () => void) {
  return useMutation<UpdateMyAccountDetails, UpdateMyAccountDetailsVariables>(
    CREATE_UPDATE_PERSON,
    {
      onCompleted,
    },
  );
}
