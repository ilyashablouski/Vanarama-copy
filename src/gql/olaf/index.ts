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
  mutation createUpdatePerson(
    $title: String!
    $mstatus: String!
    $fname: String!
    $lname: String!
    $mname: String
    $consent: Boolean!
    $dob: String!
    $email: String!
    $phone: String!
  ) {
    createUpdatePerson(
      input: {
        title: $title
        maritalStatus: $mstatus
        firstName: $fname
        smsConsent: $consent
        emailConsent: $consent
        lastName: $lname
        middleName: $mname
        dateOfBirth: $dob
        emailAddress: { kind: "Home", value: $email, primary: true }
        telephoneNumber: { kind: "Mobole", value: $phone, primary: true }
      }
    ) {
      id
      uuid
      firstName
      lastName
      middleName
      dateOfBirth
      maritalStatus
      title
      emailAddresses {
        value
      }
      telephoneNumbers {
        value
      }
    }
  }
`;
