import { gql } from '@apollo/client';

export const GET_COMPANIES_BY_PERSON_UUID = gql`
  query GetCompaniesByPersonUuid($personUuid: ID!) {
    companiesByPersonUuid(personUuid: $personUuid) {
      partyUuid
      uuid
    }
  }
`;

export default GET_COMPANIES_BY_PERSON_UUID;
