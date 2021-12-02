/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GenericPageQueryTiles
// ====================================================

export interface GenericPageQueryTiles_tiles_link {
  text: string | null;
  url: string | null;
  legacyUrl: string | null;
}

export interface GenericPageQueryTiles_tiles_image_file_details_image {
  width: number;
  height: number;
}

export interface GenericPageQueryTiles_tiles_image_file_details {
  image: GenericPageQueryTiles_tiles_image_file_details_image;
}

export interface GenericPageQueryTiles_tiles_image_file {
  fileName: string;
  contentType: string;
  url: string;
  details: GenericPageQueryTiles_tiles_image_file_details;
}

export interface GenericPageQueryTiles_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageQueryTiles_tiles_image_file | null;
}

export interface GenericPageQueryTiles_tiles {
  body: string | null;
  title: string | null;
  link: GenericPageQueryTiles_tiles_link | null;
  image: GenericPageQueryTiles_tiles_image | null;
}

export interface GenericPageQueryTiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: GenericPageQueryTiles_tiles[] | null;
}
