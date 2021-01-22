import { useApolloClient, gql } from '@apollo/client';

export const query = gql`
  query CompanyNameQuery {
    company @client
  }
`;

/**
 * --- useCompanyName hook ---
 */
export default function useCompanyName() {
  const client = useApolloClient();
  return {
    setCachedCompanyName(cname: string): void {
      client.writeQuery({
        query,
        data: { __typename: 'CompanyName', CompanyName: cname },
      });
    },
    get cachedCompanyName() {
      try {
        const res = client.readQuery({ query });
        // eslint-disable-next-line no-console
        console.log(res);
        return res.CompanyName;
      } catch {
        return '';
      }
    },
  };
}
