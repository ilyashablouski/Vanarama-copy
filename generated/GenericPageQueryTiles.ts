/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: GenericPageQueryTiles
// ====================================================

export interface GenericPageQueryTiles_tiles_image_file {
  url: string;
  fileName: string;
  contentType: string;
}

export interface GenericPageQueryTiles_tiles_image {
  title: string | null;
  description: string | null;
  file: GenericPageQueryTiles_tiles_image_file | null;
}

export interface GenericPageQueryTiles_tiles {
  body: string | null;
  title: string | null;
  link: string | null;
  image: GenericPageQueryTiles_tiles_image | null;
}

export interface GenericPageQueryTiles {
  position: number | null;
  name: string | null;
  tilesTitle: string | null;
  titleTag: string | null;
  tiles: GenericPageQueryTiles_tiles[] | null;
}
