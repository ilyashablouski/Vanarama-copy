import { BlogPosts } from '../../generated/BlogPosts';
import { BlogPost } from '../../generated/BlogPost';
import { Nullable } from '../types/common';

export interface IBlogPost {
  data: BlogPost | undefined;
  blogPosts: BlogPosts | undefined;
}

export interface IBlogCategory {
  data: BlogPosts | undefined;
  pageNumber?: Nullable<number>;
}

export enum CarouselPositionEnum {
  aboveFooter = 'Above Footer',
  withinBody = 'Within Body',
}
