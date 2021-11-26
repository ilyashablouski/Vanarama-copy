/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: GetImacaAssets
// ====================================================

export interface GetImacaAssets_getImacaAssets_colours {
  capId: number | null;
  hex: string | null;
  imacaName: string | null;
  lqName: string | null;
  onOffer: boolean | null;
  matchAccuracy: number | null;
}

export interface GetImacaAssets_getImacaAssets {
  vehicleUrl: string | null;
  tyresUrl: string | null;
  rimsUrl: string | null;
  colours: GetImacaAssets_getImacaAssets_colours[] | null;
}

export interface GetImacaAssets {
  /**
   * Imaca assets for ImacaViewer
   */
  getImacaAssets: GetImacaAssets_getImacaAssets | null;
}

export interface GetImacaAssetsVariables {
  capId: number;
  vehicleType: VehicleTypeEnum;
}
