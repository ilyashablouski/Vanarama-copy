import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {
  CreateQuickCreditCheckerMutation as Mutation,
  CreateQuickCreditCheckerMutationVariables as MutationVariables,
} from '../../../generated/CreateQuickCreditCheckerMutation';
import YourEligibilityChecker from '../../components/EligibilityChecker/YourEligibilityChecker';

export const QUICK_CREDIT_CHECKER = gql`
  mutation CreateQuickCreditCheckerMutation(
    $input: QuickCreditCheckerInputObject!
  ) {
    quickCreditChecker(input: $input) {
      ...QuickCreditCheckerEligibility
    }
  }
  ${YourEligibilityChecker.fragments.creditChecker}
`;

export function useCreditChecker(onCompleted: (data: Mutation) => void) {
  return useMutation<Mutation, MutationVariables>(QUICK_CREDIT_CHECKER, {
    onCompleted,
  });
}
