import { IBreadcrumb } from 'types/breadcrumbs';
import {
  getPartnerProperties,
  isPartnerSessionActive,
} from './partnerProperties';

export function getBreadcrumbItems(breadcrumbs: IBreadcrumb[]) {
  const breadcrumbsItems = breadcrumbs?.map((el: IBreadcrumb) => ({
    link: { href: el.href || '', label: el.label },
  }));
  const partnerProperties = getPartnerProperties();
  const partnershipSessionActive = isPartnerSessionActive();
  // check if partnership session is active
  if (partnerProperties && partnershipSessionActive) {
    breadcrumbsItems[0] = {
      link: {
        href: `/partnerships/${partnerProperties?.slug?.toLowerCase()}`,
        label: 'Home',
      },
    };
  }
  return breadcrumbsItems;
}

export default {
  getBreadcrumbItems,
};
