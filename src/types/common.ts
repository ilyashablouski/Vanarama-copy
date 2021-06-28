import { NextPageContext } from 'next';

export type Nullish<T> = T | null | undefined;
export type Nullable<T> = T | null;

export interface PreviewNextPageContext extends NextPageContext {
  preview?: boolean;
}
