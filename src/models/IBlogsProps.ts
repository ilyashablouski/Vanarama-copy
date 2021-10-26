import { ApolloError } from '@apollo/client';
import { BlogPosts } from '../../generated/BlogPosts';
import { BlogPost } from '../../generated/BlogPost';
import { IErrorProps } from '../types/common';

export interface IBlogPost {
  data: BlogPost | undefined;
  loading: boolean | undefined;
  error?: IErrorProps;
  blogPosts: BlogPosts | undefined;
  blogPostsLoading: boolean | undefined;
  blogPostsError: ApolloError | undefined;
}

export interface IBlogCategory {
  data: BlogPosts | undefined;
  loading: boolean | undefined;
  error?: IErrorProps;
  pageNumber?: number;
}
