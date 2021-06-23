import { ApolloQueryResult, gql } from '@apollo/client';

import {
  GetVehicleConfigList,
  GetVehicleConfigList_vehicleConfigurationByConfigId,
} from '../../generated/GetVehicleConfigList';

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

export const getVehicleConfigIdsFromConfigList = (
  configList: GetVehicleConfigList_vehicleConfigurationByConfigId[],
) => configList.map(config => config.configId);
