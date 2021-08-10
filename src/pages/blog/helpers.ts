import Cookies from 'js-cookie';
import { getBlogBreadCrumbsFromSlug } from '../../utils/breadcrumbs';
import { IBreadcrumb, IBreadcrumbLink } from '../../types/breadcrumbs';
import { IMetaDataSection } from '../../types/common';

function getBreadCrumbsItems(
  metaData: IMetaDataSection,
): IBreadcrumbLink[] | null {
  const isBreadcrumbsFromSlugEnabled = Cookies.get('DIG-6993') === '1';

  if (isBreadcrumbsFromSlugEnabled) {
    return metaData?.breadcrumbs
      ? metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
          link: { href: el.href || '', label: el.label },
        }))
      : getBlogBreadCrumbsFromSlug(metaData.slug);
  }
  return metaData?.breadcrumbs
    ? metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
        link: { href: el.href || '', label: el.label },
      }))
    : null;
}

export default getBreadCrumbsItems;
