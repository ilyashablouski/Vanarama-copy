import { GenericPageBreadcrumbsQuery } from '../../generated/GenericPageBreadcrumbsQuery';
import { GenericPageQuery } from '../../generated/GenericPageQuery';
import { IErrorProps } from '../types/common';

export interface IInsurancePage {
  data: GenericPageQuery | undefined;
  breadcrumbsData: GenericPageBreadcrumbsQuery | undefined;
  error?: IErrorProps;
}
