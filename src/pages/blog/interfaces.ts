import { IBreadcrumb } from '../../types/breadcrumbs';

export interface IMetaDataSection {
  breadcrumbs: IBreadcrumb[] | null;
  canonicalUrl: string | null;
  legacyUrl: string | null;
  metaDescription: string | null;
  metaRobots: string | null;
  name: string | null;
  pageType: string | null;
  publishedOn: string;
  schema: JSON | null;
  slug: string | null;
  title: string | null;
}
