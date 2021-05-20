import { useApolloClient, gql } from '@apollo/client';

export const query = gql`
  query LastStepQuery {
    lastStep @client
  }
`;

/**
 * --- useProgressHistory hook ---
 * pass in required orderID
 * @return {Object}  return lastStep setter fn and getter
 */
export default function useProgressHistory() {
  const client = useApolloClient();
  return {
    setCachedLastStep(currentStep: number): void {
      client.writeQuery({
        query,
        data: { __typename: 'LastStep', lastStep: { value: currentStep } },
      });
    },
    get cachedLastStep() {
      try {
        const res = client.readQuery({ query });
        // eslint-disable-next-line no-console
        console.log(res);
        return res.lastStep.value || 1;
      } catch {
        return 1;
      }
    },
  };
}
