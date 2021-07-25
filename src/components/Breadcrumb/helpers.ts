import { ILink } from 'core/interfaces/link';
import { NextRouter } from 'next/router';
import { IBaseProps } from 'core/interfaces/base';

export interface IBreadcrumbProps extends IBaseProps {
  items?: IBreadcrumbLink[] | null;
}

export interface IBreadcrumbLink {
  link: ILink;
  as?: string;
}

export const routerItems = (router: NextRouter): IBreadcrumbLink[] => {
  const path = router.asPath
    .split('?')[0] // delete query from path
    .split('/'); // break path string to array
  return path.reduce((arr, el) => {
    const index = path.findIndex(_el => el === _el);
    const href = path.slice(0, index + 1); // collect href from prev. item
    arr.push({
      link: {
        href: el ? href.join('/') : '/', // if el not empty we create href with prev. href and el
        label: el ? el.replace(/-/g, ' ') : 'home',
      },
    });
    return arr;
  }, [] as IBreadcrumbLink[]);
};
