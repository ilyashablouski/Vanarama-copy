/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: productDerivatives
// ====================================================

export interface productDerivatives_productDerivatives_derivatives {
  alloys: boolean | null;
  availability: number | null;
  cap_body_style: string | null;
  cap_code: string | null;
  cap_id: string | null;
  config_id: number | null;
  derivative_id: number | null;
  derivative_name: string | null;
  doors: number | null;
  engine_power_bhp: number | null;
  engine_power_kw: number | null;
  engine_size: number | null;
  engine_torque: number | null;
  finance_type: string | null;
  fuel_type: string | null;
  full_description: string | null;
  full_price: number | null;
  funder: string | null;
  height: number | null;
  in_stock: boolean | null;
  indexed_at: any | null;
  initial_payment: number | null;
  initial_payment_maintained: number | null;
  initial_period: number | null;
  insurance_group: string | null;
  introduced_at: any | null;
  inventory_count: number | null;
  length: number | null;
  load_length: number | null;
  load_width: number | null;
  lq_body_style: string | null;
  lq_funder_id: number | null;
  lq_funder_rate_id: number | null;
  lq_url: string | null;
  lq_vehicle_id: number | null;
  maintenance_price: number | null;
  manufacturer_id: number | null;
  manufacturer_name: string | null;
  mileage: number | null;
  model_id: number | null;
  model_name: string | null;
  model_year: number | null;
  no_of_gears: number | null;
  no_of_seats: number | null;
  offer_ranking: number | null;
  on_offer: boolean | null;
  range_id: number | null;
  range_name: string | null;
  received_at: any | null;
  rental: number | null;
  rental_maintained: number | null;
  sku: string | null;
  stock_batch_id: number | null;
  term: number | null;
  top_speed: number | null;
  total_lease_cost: number | null;
  total_lease_cost_maintained: number | null;
  towing_capacity: number | null;
  transmission: string | null;
  updated_at: any | null;
  url: string | null;
  vehicle_category: string | null;
  vehicle_type: string | null;
  weight: number | null;
  wheelbase: number | null;
  width: number | null;
}

export interface productDerivatives_productDerivatives {
  total: number | null;
  derivatives: (productDerivatives_productDerivatives_derivatives | null)[] | null;
}

export interface productDerivatives {
  productDerivatives: productDerivatives_productDerivatives | null;
}

export interface productDerivativesVariables {
  query?: string | null;
  from?: number | null;
  size?: number | null;
}
