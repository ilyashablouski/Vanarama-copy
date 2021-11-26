/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: sicCodes
// ====================================================

export interface sicCodes_sicCodes_sicData {
  sicCode: string;
  description: string;
}

export interface sicCodes_sicCodes {
  sicData: sicCodes_sicCodes_sicData[];
}

export interface sicCodes {
  /**
   * Get SIC codes by argument
   */
  sicCodes: sicCodes_sicCodes;
}

export interface sicCodesVariables {
  value: string;
}
