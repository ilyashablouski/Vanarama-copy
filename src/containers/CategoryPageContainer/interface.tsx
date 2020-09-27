/* eslint-disable @typescript-eslint/camelcase */
import {
  GenericPageQuery_genericPage_sections_carousel,
  GenericPageQuery_genericPage_metaData,
  GenericPageQuery_genericPage_featuredImage,
} from '../../../generated/GenericPageQuery';

export interface ICategoryPage {
  carousel: GenericPageQuery_genericPage_sections_carousel | null | undefined;
  metaData: GenericPageQuery_genericPage_metaData | undefined;
  featuredImage?: GenericPageQuery_genericPage_featuredImage | null | undefined;
}
