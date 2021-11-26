/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: companyProfile
// ====================================================

export interface companyProfile_companyProfile_sicData {
  sicCode: string;
  description: string;
}

export interface companyProfile_companyProfile {
  sicData: companyProfile_companyProfile_sicData[];
}

export interface companyProfile {
  /**
   * Companies House company profile.
   */
  companyProfile: companyProfile_companyProfile;
}

export interface companyProfileVariables {
  companyNumber: string;
}
