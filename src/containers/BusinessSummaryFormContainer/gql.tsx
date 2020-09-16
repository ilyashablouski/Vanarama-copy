import { gql, useMutation } from '@apollo/client';
import {
  B2bFullCreditChecker,
  B2bFullCreditCheckerVariables,
} from '../../../generated/B2bFullCreditChecker';
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

export const FULL_CREDIT_CHECKER_B2B = gql`
  mutation B2bFullCreditChecker($input: FullCreditCheckerInputObject!) {
    b2bFullCreditChecker(input: $input) {
      creditCheck {
        uuid
        createdAt
        creditCheckType
        creditCheckLines {
          uuid
          funder
          likelihood
        }
        party {
          uuid
          person {
            uuid
            partyId
            partyUuid
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export function useUseFullCreditCheckerB2BMutation() {
  return useMutation<B2bFullCreditChecker, B2bFullCreditCheckerVariables>(
    FULL_CREDIT_CHECKER_B2B,
  );
}
