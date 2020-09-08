export interface IFeaturedImageFile {
  file?: {
    url?: string;
    details?: {
      image?: {
        width?: number | null;
        height?: number | null;
      } | null;
    } | null;
  } | null;
}

export interface IHeadProps {
  title?: string;
  metaDescription?: string | null;
  metaRobots?: string | null;
  legacyUrl?: string | null;
  canonicalUrl?: string | null;
  publishedOn?: string | null;
  featuredImage?: IFeaturedImageFile | null;
}
