import { GenericPageBreadcrumbsQuery } from '../../generated/GenericPageBreadcrumbsQuery';
import { GenericPageQuery } from '../../generated/GenericPageQuery';
import { IPageWithError, PageTypeEnum } from '../types/common';

export type IInsurancePage =
  | {
      pageType: PageTypeEnum.DEFAULT;
      data: GenericPageQuery;
      breadcrumbsData?: GenericPageBreadcrumbsQuery;
    }
  | IPageWithError;
