import { BlogPosts } from '../../generated/BlogPosts';
import { BlogPost } from '../../generated/BlogPost';
import { Nullable } from '../types/common';
import { VehicleListUrl_vehicleList as IVehicleList } from '../../generated/VehicleListUrl';
import { GetDerivatives } from '../../generated/GetDerivatives';
import { ProductCardData } from '../../generated/ProductCardData';

export interface IBlogPost {
  data: BlogPost | undefined;
  blogPosts: BlogPosts | undefined;
}

export interface IBlogCategory {
  data: BlogPosts | undefined;
  pageNumber?: Nullable<number>;
}

export interface IBlogPostWithCarousel extends IBlogPost {
  productsCar?: Nullable<ProductCardData>;
  productsCarDerivatives?: Nullable<GetDerivatives>;
  vehicleListUrlData?: IVehicleList;
}
