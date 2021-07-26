import { NextPageContext } from 'next';
import { ReactChild, ReactPortal } from 'react';

export type Nullish<T> = T | null | undefined;
export type Nullable<T> = T | null;
export type Component = ReactChild | Array<Component> | ReactPortal;

export interface PreviewNextPageContext extends NextPageContext {
  preview?: boolean;
}

export interface SlugNextPageContext extends NextPageContext {
  resolvedUrl?: string;
}
