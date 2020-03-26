import { gql } from 'apollo-boost';

export const ALL_DROPDOWNS = gql`
  query AllDropDownsQuery {
    allDropDowns {
      titles {
        data
        favourites
      }
      countries {
        data
        favourites
      }
      nationalities {
        data
        favourites
      }
      maritalStatuses {
        data
      }
      noOfDependants {
        data
      }
      noOfAdultsInHousehold {
        data
      }
      propertyStatuses {
        data
      }
      employmentStatuses {
        data
      }
    }
  }
`;

export const CREATE_UPDATE_PERSON = gql`
  mutation CreateUpdatePersonMutation(
    $title: String!
    $mstatus: String!
    $fname: String!
    $lname: String!
    $mname: String
    $consent: Boolean!
    $dob: Date!
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
        telephoneNumber: { kind: "Mobile", value: $phone, primary: true }
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
