import { GenericPageBreadcrumbsQuery } from '../../generated/GenericPageBreadcrumbsQuery';
import { GenericPageQuery } from '../../generated/GenericPageQuery';
import { IErrorProps, PageTypeEnum } from '../types/common';

export type IInsurancePage =
  | {
      pageType: PageTypeEnum.DEFAULT;
      data: GenericPageQuery;
      breadcrumbsData?: GenericPageBreadcrumbsQuery;
    }
  | {
      pageType: PageTypeEnum.ERROR;
      error: IErrorProps;
    };
