/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyAccountInputObject } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMyAccountDetails
// ====================================================

export interface UpdateMyAccountDetails_updateMyAccountDetails_address {
  lineOne: string;
  lineTwo: string | null;
  city: string;
  postcode: string;
  serviceId: string | null;
}

export interface UpdateMyAccountDetails_updateMyAccountDetails {
  personUuid: string;
  firstName: string;
  lastName: string;
  address: UpdateMyAccountDetails_updateMyAccountDetails_address | null;
  telephoneNumber: string | null;
  emailAddress: string;
}

export interface UpdateMyAccountDetails {
  /**
   * Update perosonal details in my account
   */
  updateMyAccountDetails: UpdateMyAccountDetails_updateMyAccountDetails | null;
}

export interface UpdateMyAccountDetailsVariables {
  input: MyAccountInputObject;
}
