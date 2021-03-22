/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FilterListObject, PaginationInputObject, SortObject, FinanceTypeEnum, VehicleTypeEnum } from "./globalTypes";

// ====================================================
// GraphQL query operation: HelpMeChoose
// ====================================================

export interface HelpMeChoose_helpMeChoose_vehicles {
  financeType: FinanceTypeEnum | null;
  vehicleType: VehicleTypeEnum | null;
  manufacturerName: string | null;
  modelName: string | null;
  rental: number | null;
  initialPayment: number | null;
  rangeName: string | null;
  transmission: string | null;
  fuelType: string | null;
  capBodyStyle: string | null;
  term: number | null;
  mileage: number | null;
  availability: number | null;
  derivativeId: string | null;
  derivativeName: string | null;
  lqUrl: string | null;
  url: string | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_financeType {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_vehicleType {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_transmission {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_fuelType {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_capBodyStyle {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_term {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_mileage {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_initialPeriod {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_availability {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_rental {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation_initialPayment {
  key: string | null;
  docCount: number | null;
}

export interface HelpMeChoose_helpMeChoose_aggregation {
  totalVehicles: number | null;
  financeType: HelpMeChoose_helpMeChoose_aggregation_financeType[] | null;
  vehicleType: HelpMeChoose_helpMeChoose_aggregation_vehicleType[] | null;
  transmission: HelpMeChoose_helpMeChoose_aggregation_transmission[] | null;
  fuelType: HelpMeChoose_helpMeChoose_aggregation_fuelType[] | null;
  capBodyStyle: HelpMeChoose_helpMeChoose_aggregation_capBodyStyle[] | null;
  term: HelpMeChoose_helpMeChoose_aggregation_term[] | null;
  mileage: HelpMeChoose_helpMeChoose_aggregation_mileage[] | null;
  initialPeriod: HelpMeChoose_helpMeChoose_aggregation_initialPeriod[] | null;
  availability: HelpMeChoose_helpMeChoose_aggregation_availability[] | null;
  rental: HelpMeChoose_helpMeChoose_aggregation_rental[] | null;
  initialPayment: HelpMeChoose_helpMeChoose_aggregation_initialPayment[] | null;
}

export interface HelpMeChoose_helpMeChoose {
  vehicles: HelpMeChoose_helpMeChoose_vehicles[] | null;
  aggregation: HelpMeChoose_helpMeChoose_aggregation | null;
}

export interface HelpMeChoose {
  /**
   * Help me choose vehicle list
   */
  helpMeChoose: HelpMeChoose_helpMeChoose | null;
}

export interface HelpMeChooseVariables {
  filter?: FilterListObject | null;
  pagination?: PaginationInputObject | null;
  sort?: SortObject[] | null;
}
