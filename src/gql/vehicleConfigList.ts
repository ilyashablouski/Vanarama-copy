import { gql } from '@apollo/client';

/* eslint-disable import/prefer-default-export */
export const GET_VEHICLE_CONFIG_LIST = gql`
  query GetVehicleConfigList($configIds: [String!]!) {
    vehicleConfigurationByConfigId(configIds: $configIds) {
      published
      configId
    }
  }
`;
