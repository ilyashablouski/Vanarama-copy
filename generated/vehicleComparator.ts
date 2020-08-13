/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VehicleToCompare, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: vehicleComparator
// ====================================================

export interface vehicleComparator_vehicleComparator_data {
  name: string | null;
  value: string | null;
}

export interface vehicleComparator_vehicleComparator {
  capId: number | null;
  vehicleType: VehicleTypeEnum | null;
  data: (vehicleComparator_vehicleComparator_data | null)[] | null;
}

export interface vehicleComparator {
  vehicleComparator: (vehicleComparator_vehicleComparator | null)[] | null;
}

export interface vehicleComparatorVariables {
  vehicles: VehicleToCompare[];
}
