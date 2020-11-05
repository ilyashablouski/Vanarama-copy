import { ApolloError } from '@apollo/client';
import { GenericPageBreadcrumbsQuery } from '../../generated/GenericPageBreadcrumbsQuery';
import { GenericPageQuery } from '../../generated/GenericPageQuery';

export interface IInsurancePage {
  data: GenericPageQuery | undefined;
  breadcrumbsData: GenericPageBreadcrumbsQuery | undefined;
  error: ApolloError | undefined;
}
