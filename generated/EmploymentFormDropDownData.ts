/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: EmploymentFormDropDownData
// ====================================================

export interface EmploymentFormDropDownData_employmentStatuses {
  __typename: "DropDownDataType";
  data: string[];
  favourites: string[];
}

export interface EmploymentFormDropDownData {
  __typename: "DropDownType";
  employmentStatuses: EmploymentFormDropDownData_employmentStatuses;
}
