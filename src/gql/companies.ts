import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const GET_COMPANIES_BY_PERSON_UUID = gql`
  query GetCompaniesByPersonUuid($personUuid: ID!) {
    companiesByPersonUuid(personUuid: $personUuid) {
      partyUuid
      uuid
    }
  }
`;
