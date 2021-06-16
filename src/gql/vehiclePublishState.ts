import { gql } from '@apollo/client';

/* eslint-disable import/prefer-default-export */
export const GET_VEHICLE_PUBLISH_STATE = gql`
  query GetVehiclePublishState($capId: Int!, $vehicleType: VehicleTypeEnum) {
    vehicleConfigurationByCapId(capId: $capId, vehicleType: $vehicleType) {
      capDerivativeId
      published
    }
  }
`;
