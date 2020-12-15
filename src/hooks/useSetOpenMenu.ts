import { useApolloClient, gql } from '@apollo/client';

export const query = gql`
  query setOpenMenuQuery {
    menuOpen @client
  }
`;

/**
 * --- useSetMenuOpen hook ---
 * pass in required orderID
 * @return {Object}  return setter fn and getter
 */
export default function useSetOpenMenu() {
  const client = useApolloClient();
  return {
    setOpenMenuCache(isOpen: boolean): void {
      client.writeQuery({
        query,
        data: { __typename: 'MenuOpen', menuOpen: isOpen },
      });
    },
    get isMenuOpenCache() {
      try {
        const res = client.readQuery({ query });
        return res.menuOpen;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return false;
      }
    },
  };
}
