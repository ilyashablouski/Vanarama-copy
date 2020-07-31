export interface IFeaturedImage {
  url?: string;
  width?: number;
  height?: number;
}

export interface IHeadProps {
  title?: string;
  metaDescription?: string;
  legacyUrl?: string;
  publishedOn?: string;
  featuredImage?: IFeaturedImage;
}
