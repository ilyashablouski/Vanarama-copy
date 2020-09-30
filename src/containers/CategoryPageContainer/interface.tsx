/* eslint-disable @typescript-eslint/camelcase */
import {
  GenericPageQuery_genericPage_sections_carousel,
  GenericPageQuery_genericPage_metaData,
  GenericPageQuery_genericPage_featuredImage,
  GenericPageQuery_genericPage_sections_featured,
  GenericPageQuery_genericPage_sections_tiles,
} from '../../../generated/GenericPageQuery';

export interface ICategoryPage {
  carousel: GenericPageQuery_genericPage_sections_carousel | null | undefined;
  metaData: GenericPageQuery_genericPage_metaData | null | undefined;
  tiles?: GenericPageQuery_genericPage_sections_tiles | null | undefined;
  featured?: GenericPageQuery_genericPage_sections_featured | null | undefined;
  featuredImage?: GenericPageQuery_genericPage_featuredImage | null | undefined;
}
