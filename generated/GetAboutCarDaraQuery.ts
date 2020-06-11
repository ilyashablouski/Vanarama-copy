/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAboutCarDataQuery
// ====================================================
  
  export interface GetCustomerReview {
    name?: string;
    rating?: number;
  }

  export interface GetRelatedVehicle {
    capId?: string;
  }
  
  export interface GetAboutCarDataQuery_vehicleDetails {
    averageRating?: number;
    warranty?: string;
    brochureUrl?: string | null;
    customerReview?: GetCustomerReview[];
    relatedVehicle?: GetRelatedVehicle[] | null;
    independentReview?: string;
  }

  export interface GetAboutCarDataQuery_vehicleConfigurationByCapId {
    uuid: string;
    capManufacturerDescription?: string;
    capModelDescription?: string;
    capDerivativeDescription?: string;
    capPaintDescription?: string;
    capTrimDescription?: string;
    onOffer?: boolean;
    offerRanking?: number;
  }
  
  export interface GetAboutCarDataQuery {
    vehicleDetails: GetAboutCarDataQuery_vehicleDetails | null;
    vehicleConfigurationByCapId: GetAboutCarDataQuery_vehicleConfigurationByCapId | null;
  }
  
  export interface GetAboutCarDataQueryVariables {
    capId: number;
    capIdDetails: number,
    vehicleType?: 'CAR' | 'LCV';
  }
  