import {
  GenericPageQuery_genericPage_sections_cards_cards as ICards,
  GenericPageQuery_genericPage_sections_featured as IFeatured,
  GenericPageQuery_genericPage_metaData as IPageMetaData,
} from '../../generated/GenericPageQuery';
import { IManufacturersSlug } from '../types/manufacturerSlug';

export interface ISearchPageProps {
  isServer: boolean;
  metaData: IPageMetaData;
  migrationSlugs?: IManufacturersSlug;
}

export interface INotFoundPageData {
  name: string | null | undefined;
  cards?: (ICards | null)[] | null | undefined;
  featured?: IFeatured | null | undefined;
}
