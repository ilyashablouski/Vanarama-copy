import { gql } from '@apollo/client';
import BusinessSummaryForm from '../../components/BusinessSummaryForm/BusinessSummaryForm';
import AboutForm from '../../components/AboutForm';

export const GET_COMPANY_SUMMARY = gql`
  query GetCompanySummaryQuery($uuid: ID!, $personUuid: ID!) {
    companyByUuid(uuid: $uuid) {
      ...SummaryFormCompany
    }
    personByUuid(uuid: $personUuid) {
      ...AboutFormPerson
    }
  }
  ${BusinessSummaryForm.fragments.company}
  ${AboutForm.fragments.person}
`;

export default GET_COMPANY_SUMMARY;
