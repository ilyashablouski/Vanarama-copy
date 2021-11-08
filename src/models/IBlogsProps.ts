import { ApolloError } from '@apollo/client';
import { BlogPosts } from '../../generated/BlogPosts';
import { BlogPost } from '../../generated/BlogPost';
import { IErrorProps, Nullable } from '../types/common';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../generated/VehicleListUrl';
import { GetDerivatives } from '../../generated/GetDerivatives';
import { ProductCardData } from '../../generated/ProductCardData';

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

export interface IBlogPostWithCarousel extends IBlogPost {
  productsCar?: Nullable<ProductCardData>;
  productsCarDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData?: IVehicleList;
}
