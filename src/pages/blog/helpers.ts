import { getBlogBreadCrumbsFromSlug } from '../../utils/breadcrumbs';
import { IBreadcrumb, IBreadcrumbLink } from '../../types/breadcrumbs';
import { IMetaDataSection } from '../../types/common';

function getBreadCrumbsItems(
  metaData: IMetaDataSection,
): IBreadcrumbLink[] | null {
  return metaData?.breadcrumbs
    ? metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
        link: { href: el.href || '', label: el.label },
      }))
    : getBlogBreadCrumbsFromSlug(metaData.slug);
}

export default getBreadCrumbsItems;
