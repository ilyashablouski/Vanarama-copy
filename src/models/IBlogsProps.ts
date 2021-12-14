import { BlogPosts } from '../../generated/BlogPosts';
import { BlogPost } from '../../generated/BlogPost';
import { IPageWithData, Nullable } from '../types/common';

export type IBlogPostProps = IPageWithData<IBlogPost>;

export interface IBlogPost {
  data: BlogPost | undefined;
  blogPosts: BlogPosts | undefined;
  articleUrl: string;
}

export interface IBlogCategory {
  data: BlogPosts | undefined;
  pageNumber?: Nullable<number>;
}

export enum CarouselPositionEnum {
  aboveFooter = 'Above Footer',
  withinBody = 'Within Body',
}
