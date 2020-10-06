import { useApolloClient, gql } from '@apollo/client';

const query = gql`
  query LastStepQuery {
    lastStep @client
  }
`;

/**
 * --- useProgressHistory hook ---
 * @return {Object}  return lastStep setter fn and getter
 */
export default function useProgressHistory() {
  const client = useApolloClient();
  return {
    setCachedLastStep(currentStep: number): void {
      client.writeQuery({
        query,
        data: { __typename: 'LastStep', lastStep: currentStep },
      });
    },
    get cachedLastStep() {
      try {
        const res = client.readQuery({ query });
        return res.lastStep;
      } catch {
        return 1;
      }
    },
  };
}
