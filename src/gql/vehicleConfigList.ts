import { ApolloQueryResult, gql } from '@apollo/client';
import { GetVehicleConfigList } from '../../generated/GetVehicleConfigList';

export const GET_VEHICLE_CONFIG_LIST = gql`
  query GetVehicleConfigList($configIds: [String!]!) {
    vehicleConfigurationByConfigId(configIds: $configIds) {
      published
      configId
    }
  }
`;

export const getVehicleConfigListFromQuery = (
  query: ApolloQueryResult<GetVehicleConfigList>,
) => query.data.vehicleConfigurationByConfigId ?? [];
