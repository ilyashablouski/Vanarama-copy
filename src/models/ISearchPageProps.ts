import { ApolloError } from '@apollo/client';
import {
  GenericPageQuery_genericPage_sections_cards_cards as ICards,
  GenericPageQuery_genericPage_sections_featured as IFeatured,
  GenericPageQuery_genericPage_metaData as IPageMetaData,
} from '../../generated/GenericPageQuery';

export interface ISearchPageProps {
  isServer: boolean;
  error?: ApolloError;
  notFoundPageData?: INotFoundPageData;
  metaData: IPageMetaData;
}

export interface INotFoundPageData {
  name: string | null | undefined;
  cards?: (ICards | null)[] | null | undefined;
  featured?: IFeatured | null | undefined;
}
