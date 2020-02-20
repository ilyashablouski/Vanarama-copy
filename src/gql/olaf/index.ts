import { gql } from 'apollo-boost';

export const GET_DROPDOWN_DATA = gql`
  query allDropDowns {
    allDropDowns {
      titles
      countries
      nationalities
      maritalStatuses
      noOfDependants
      noOfAdultsInHousehold
      propertyStatuses
      employmentStatuses
    }
  }
`;

export const POST_ABOUT = gql`
  mutation SendAboutData($details: String!) {
    createUpdatePerson(input: $details)
  }
`;
