/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: imageFile
// ====================================================

export interface imageFile_details_image {
  width: number;
  height: number;
}

export interface imageFile_details {
  size: number;
  image: imageFile_details_image;
}

export interface imageFile {
  url: string;
  details: imageFile_details;
}
