import { NextPageContext } from 'next';
import { ReactChild, ReactPortal } from 'react';
import { IBreadcrumb } from './breadcrumbs';

export type Nullish<T> = T | null | undefined;
export type Nullable<T> = T | null;
export type Component = ReactChild | Array<Component> | ReactPortal;

export interface PreviewNextPageContext extends NextPageContext {
  preview?: boolean;
}

export interface SlugNextPageContext extends NextPageContext {
  resolvedUrl?: string;
}

export interface IMetaDataSection {
  breadcrumbs: IBreadcrumb[] | null;
  canonicalUrl: string | null;
  legacyUrl: string | null;
  metaDescription: string | null;
  metaRobots: string | null;
  name: string | null;
  pageType: string | null;
  publishedOn: string;
  schema: JSON | null;
  slug: string | null;
  title: string | null;
}
