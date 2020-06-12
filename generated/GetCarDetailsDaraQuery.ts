/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCarDetailsDataQuery
// ====================================================
  
  export interface GetCustomerReview {
    name?: string;
    rating?: number;
  }

  export interface GetRelatedVehicle {
    capId?: string;
  }
  
  export interface GetCarDetailsDataQuery_vehicleDetails {
    averageRating?: number;
    warranty?: string;
    brochureUrl?: string | null;
    customerReview?: GetCustomerReview[];
    relatedVehicle?: GetRelatedVehicle[] | null;
    independentReview?: string;
  }

  export interface GetCarDetailsDataQuery_vehicleConfigurationByCapId {
    uuid: string;
    capManufacturerDescription?: string;
    capModelDescription?: string;
    capDerivativeDescription?: string;
    capPaintDescription?: string;
    capTrimDescription?: string;
    onOffer?: boolean;
    offerRanking?: number;
  }
  
  export interface GetCarDetailsDataQuery {
    vehicleDetails: GetCarDetailsDataQuery_vehicleDetails | null;
    vehicleConfigurationByCapId: GetCarDetailsDataQuery_vehicleConfigurationByCapId | null;
  }
  
  export interface GetCarDetailsDataQueryVariables {
    capId: number;
    capIdDetails: number,
    vehicleType?: 'CAR' | 'LCV';
  }
  