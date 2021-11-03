import { GenericPageBreadcrumbsQuery } from '../../generated/GenericPageBreadcrumbsQuery';
import { GenericPageQuery } from '../../generated/GenericPageQuery';
import { IPageWithData } from '../types/common';

export type IInsurancePage = IPageWithData<{
  breadcrumbsData?: GenericPageBreadcrumbsQuery;
  data: GenericPageQuery;
}>;
