import { gql, ApolloClient } from '@apollo/client';
import { WriteCachedOrderInformation } from '../../../generated/WriteCachedOrderInformation';

export function writeCachedOrderInformation(
  client: ApolloClient<object>,
  selectedOrderUuid: string | null,
  selectedDerivativeId: string | null,
) {
  return client.writeQuery<WriteCachedOrderInformation>({
    query: gql`
      query WriteCachedOrderInformation {
        selectedOrderUuid
        selectedDerivativeId
      }
    `,
    data: {
      selectedOrderUuid,
      selectedDerivativeId,
    },
  });
}

export default writeCachedOrderInformation;
