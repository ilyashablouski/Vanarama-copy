import { NextPageContext } from 'next';
import { ReactChild, ReactPortal } from 'react';
import { IBreadcrumb } from './breadcrumbs';

export type Nullish<T> = T | null | undefined;
export type Nullable<T> = T | null;
export type Component = ReactChild | Array<Component> | ReactPortal;

export interface PreviewNextPageContext extends NextPageContext {
  preview?: boolean;
  resolvedUrl?: string;
}

export enum PageTypeEnum {
  DEFAULT = 'DEFAULT',
  NOT_FOUND = 'NOT_FOUND',
  ERROR = 'ERROR',
}

export interface IErrorProps {
  statusCode: number;
  message: string;
}

export interface IMetaDataSection {
  breadcrumbs: Nullable<IBreadcrumb[]>;
  canonicalUrl: Nullable<string>;
  legacyUrl: Nullable<string>;
  metaDescription: Nullable<string>;
  metaRobots: Nullable<string>;
  name: Nullable<string>;
  pageType: Nullable<string>;
  publishedOn: Nullable<string>;
  schema: Nullable<JSON>;
  slug: Nullable<string>;
  title: Nullable<string>;
}
