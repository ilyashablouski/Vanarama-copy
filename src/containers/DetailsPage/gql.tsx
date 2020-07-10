import { gql, ApolloClient } from '@apollo/client';
import { WriteCachedOrderInformation } from '../../../generated/WriteCachedOrderInformation';
import { VehicleTypeEnum } from '../../../generated/globalTypes';

export function writeCachedOrderInformation(
  client: ApolloClient<object>,
  selectedOrderUuid: string | null,
  selectedDerivativeId: string | null,
  selectedVehicleType: VehicleTypeEnum,
) {
  return client.writeQuery<WriteCachedOrderInformation>({
    query: gql`
      query WriteCachedOrderInformation {
        selectedOrderUuid
        selectedDerivativeId
        selectedVehicleType
      }
    `,
    data: {
      selectedOrderUuid,
      selectedDerivativeId,
      selectedVehicleType,
    },
  });
}

export default writeCachedOrderInformation;
