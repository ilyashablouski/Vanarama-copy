/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from './globalTypes';

// ====================================================
// GraphQL query operation: GetVehicleDetails
// ====================================================

export interface GetVehicleDetails_vehicleConfigurationByCapId {
  uuid: string;
  capManufacturerDescription: string;
  capModelDescription: string;
  capDerivativeDescription: string;
  capPaintDescription: string;
  capTrimDescription: string;
  onOffer: boolean | null;
  offerRanking: number | null;
}

export interface GetVehicleDetails_vehicleDetails_keyInformation {
  name: string | null;
  value: string | null;
}

export interface GetVehicleDetails_vehicleDetails {
  averageRating: number | null;
  brochureUrl: string | null;
  keyInformation: GetVehicleDetails_vehicleDetails_keyInformation[] | null;
}

export interface GetVehicleDetails_derivativeInfo {
  technicals: [
    {
      id: string | null;
      derivativeId: string | null;
      technicalDescription: string | null;
      technicalLongDescription: string | null;
      categoryDescription: string | null;
      effectiveFrom: string | null;
      effectiveTo: string | null;
      value: string | null;
      dictionaryTechnical: {
        id: string | null;
        categoryId: string | null;
        description: string | null;
        longDescription: string | null;
      };
      dictionaryCategory: {
        id: string | null;
        description: string | null;
        longDescription: string | null;
      };
    },
  ];
  standardEquipments: [
    {
      id: string | null;
      derivativeId: string | null;
      optionDescription: string | null;
      optionLongDescription: string | null;
      categoryDescription: string | null;
      genericDescription: string | null;
      effectiveFrom: string | null;
      effectiveTo: string | null;
      dictionaryOption: {
        id: string | null;
        categoryId: string | null;
        description: string | null;
        longDescription: string | null;
      };
      dictionaryCategory: {
        id: string | null;
        description: string | null;
        longDescription: string | null;
      };
      dictionaryGeneric: {
        id: string | null;
        categoryId: string | null;
        description: string | null;
        longDescription: string | null;
      };
    },
  ];
}

export interface GetVehicleDetails {
  /**
   * Find vehicle configuration by cap id
   */
  vehicleConfigurationByCapId: GetVehicleDetails_vehicleConfigurationByCapId | null;
  vehicleDetails: GetVehicleDetails_vehicleDetails | null;
  derivativeInfo: GetVehicleDetails_derivativeInfo | null;
}

export interface GetVehicleDetailsVariables {
  capId: number;
  capIdDetails: string;
  vehicleType?: VehicleTypeEnum | null;
}
