// eslint-disable-next-line import/prefer-default-export
import { IBreadcrumb } from '../types/breadcrumbs';

export const redirectToMaintenancePage = () => ({
  redirect: {
    destination: '/maintenance',
    permanent: false,
  },
});

export const redirectToParentPage = (breadcrumbs: IBreadcrumb[]) => {
  const parentPageHref = breadcrumbs[breadcrumbs.length - 2].href;
  return {
    redirect: {
      destination: parentPageHref,
      permanent: false,
    },
  };
};
