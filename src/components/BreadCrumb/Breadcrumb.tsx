import React, { FC, memo } from 'react';
import ChevronBack from '@vanarama/uibook/lib/assets/icons/ChevronBack';
import ChevronForward from '@vanarama/uibook/lib/assets/icons/ChevronForward';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import { ILink } from '@vanarama/uibook/lib/interfaces/link';
import { useRouter } from 'next/router';
import RouterLink from '../RouterLink/RouterLink';

export interface IBreadcrumbLink {
  link: ILink;
  as?: string;
}

interface IBreadcrumbProps {
  items?: IBreadcrumbLink[] | null;
}

const Breadcrumb: FC<IBreadcrumbProps> = memo(props => {
  const router = useRouter();
  const { items } = props;

  const routerItems = (): IBreadcrumbLink[] => {
    return router.asPath.split('/').reduce((arr, el) => {
      const href = arr.map(_el => _el.link.href);
      arr.push({
        link: {
          href: el ? [...href, el].join('/').replace(/\/+/g, '/') : '/',
          label: el ? el.replace(/-/g, ' ') : 'home',
        },
      });
      return arr;
    }, [] as IBreadcrumbLink[]);
  };

  const renderParent = (item: IBreadcrumbLink) => (
    <li className="breadcrumb-item -parent" key={item.link.label}>
      <RouterLink
        classNames={{ color: 'teal', size: 'small' }}
        className="breadcrumb-item--backlink"
        link={item.link}
        as={item.as}
      >
        <Icon icon={<ChevronBack />} color="teal" />
        Back to {item.link.label}
      </RouterLink>
      <RouterLink
        classNames={{ color: 'teal', size: 'small' }}
        className="breadcrumb-item--parent"
        link={item.link}
        as={item.as}
      >
        {item.link.label}
      </RouterLink>
      <Icon icon={<ChevronForward />} size="xsmall" color="medium" />
    </li>
  );

  const renderChild = (item: IBreadcrumbLink) => (
    <li className="breadcrumb-item -child" key={item.link.label}>
      <Text size="small" color="darker" className="breadcrumb-item--child">
        {item.link.label}
      </Text>
    </li>
  );

  const breadcrumbArray = items ?? routerItems();

  return (
    <nav>
      <ol className="breadcrumb">
        {breadcrumbArray.map((item, key) =>
          breadcrumbArray.length === key + 1
            ? renderChild(item)
            : renderParent(item),
        )}
      </ol>
    </nav>
  );
});

export default Breadcrumb;
