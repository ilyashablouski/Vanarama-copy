/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: HubCarProductCards
// ====================================================

export interface HubCarProductCards_productCarousel_keyInformation {
  name: string | null;
  value: string | null;
}

export interface HubCarProductCards_productCarousel {
  capId: string | null;
  isOnOffer: boolean | null;
  manufacturerName: string | null;
  derivativeName: string | null;
  rangeName: string | null;
  imageUrl: string | null;
  leadTime: string | null;
  averageRating: number | null;
  businessRate: number | null;
  personalRate: number | null;
  offerPosition: number | null;
  keyInformation: (HubCarProductCards_productCarousel_keyInformation | null)[] | null;
}

export interface HubCarProductCards {
  productCarousel: (HubCarProductCards_productCarousel | null)[] | null;
}
