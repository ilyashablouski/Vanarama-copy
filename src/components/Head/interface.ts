export interface IFeaturedImageFile {
  file?: {
    url?: string | null;
    details?: {
      image?: {
        width?: number;
        height?: number;
      } | null;
    } | null;
  } | null;
}

export interface IHeadProps {
  title?: string | null;
  metaDescription?: string | null;
  metaRobots?: string | null;
  legacyUrl?: string | null;
  publishedOn?: string | null;
  featuredImage?: IFeaturedImageFile | null;
}
