import { getBlogBreadCrumbsFromSlug } from '../../utils/breadcrumbs';
import { IBreadcrumb, IBreadcrumbLink } from '../../types/breadcrumbs';
import { IBreadCrumbsItems } from './interfaces';

function getBreadCrumbsItems(
  metaData: IBreadCrumbsItems,
): IBreadcrumbLink[] | null {
  return metaData?.breadcrumbs
    ? metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
        link: { href: el.href || '', label: el.label },
      }))
    : getBlogBreadCrumbsFromSlug(metaData.slug);
}

export default getBreadCrumbsItems;
