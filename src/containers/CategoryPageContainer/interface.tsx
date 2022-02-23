import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import {
  GenericPageQuery_genericPage_sections_carousel,
  GenericPageQuery_genericPage_featuredImage,
  GenericPageQuery_genericPage_sections_featured,
  GenericPageQuery_genericPage_sections_tiles,
} from '../../../generated/GenericPageQuery';
import { BlogPosts_blogPosts_articles } from '../../../generated/BlogPosts';
import { GenericPageHeadQuery_genericPage_metaData } from '../../../generated/GenericPageHeadQuery';
import { IBreadcrumbLink } from '../../types/breadcrumbs';
import { Nullish } from '../../types/common';

export interface ICategoryPage {
  carousel?: GenericPageQuery_genericPage_sections_carousel | null | undefined;
  metaData: GenericPageHeadQuery_genericPage_metaData | null | undefined;
  pageTitle?: string | null;
  articles?: (BlogPosts_blogPosts_articles | null)[] | null;
  tiles?: GenericPageQuery_genericPage_sections_tiles | null | undefined;
  featured?: GenericPageQuery_genericPage_sections_featured | null | undefined;
  featuredImage?: GenericPageQuery_genericPage_featuredImage | null | undefined;
  breadcrumbsItems: Nullish<IBreadcrumbLink[]>;
  activePageRoute?: number;
  serviceBanner?: IServiceBanner;
}
