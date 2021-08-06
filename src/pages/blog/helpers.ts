import { getBlogBreadCrumbsFromSlug } from '../../utils/breadcrumbs';
import { IBreadcrumb } from '../../types/breadcrumbs';

function getBreadCrumbsItems(metaData: any): IBreadcrumb[] {
  return metaData?.breadcrumbs
    ? metaData?.breadcrumbs?.map((el: any) => ({
        link: { href: el.href || '', label: el.label },
      }))
    : getBlogBreadCrumbsFromSlug(metaData.slug);
}

export default getBreadCrumbsItems;
