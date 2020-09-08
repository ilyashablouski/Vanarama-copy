import { GenericPageHeadQuery_genericPage_metaData as MetaData } from '../../../generated/GenericPageHeadQuery';

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
  featuredImage?: IFeaturedImageFile | null;
  metaData: MetaData;
}
