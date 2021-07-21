import React, { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import { IBreadcrumbLink } from './helpers';
import useMediaQuery from '../../hooks/useMediaQuery';

import Skeleton from '../Skeleton';

const ChevronBack = dynamic(() => import('core/assets/icons/ChevronBack'), {
  loading: () => <Skeleton count={1} />,
  ssr: true,
});
const ChevronForward = dynamic(
  () => import('core/assets/icons/ChevronForward'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Icon = dynamic(() => import('core/atoms/icon/'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IBreadcrumbProps {
  items?: IBreadcrumbLink[] | null;
}

const Breadcrumb: FC<IBreadcrumbProps> = memo(props => {
  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');
  const { items } = props;

  const renderParent = (item: IBreadcrumbLink) =>
    !isDesktopOrTablet ? (
      <li className="breadcrumb-item -parent" key={`${item.link.label}-mobile`}>
        <RouterLink
          classNames={{ color: 'teal', size: 'small' }}
          className="breadcrumb-item--backlink"
          link={item.link}
          as={item.as}
        >
          <Icon icon={<ChevronBack />} color="teal" />
          Back to {decodeURIComponent(item.link.label)}
        </RouterLink>
      </li>
    ) : (
      <li
        className="breadcrumb-item -parent"
        key={`${item.link.label}-desktop`}
      >
        <RouterLink
          classNames={{ color: 'teal', size: 'small' }}
          className="breadcrumb-item--parent"
          link={item.link}
          as={item.as}
        >
          {decodeURIComponent(item.link.label)}
        </RouterLink>
        <Icon icon={<ChevronForward />} size="xsmall" color="medium" />
      </li>
    );

  const renderChild = (item: IBreadcrumbLink) => (
    <li
      className="breadcrumb-item -child"
      key={item.link.label}
      style={{ display: isDesktopOrTablet ? 'grid' : 'none' }}
    >
      <Text size="small" color="darker" className="breadcrumb-item--child">
        {decodeURIComponent(item.link.label)}
      </Text>
    </li>
  );

  if (!items?.length) {
    return null;
  }

  return (
    <nav>
      <ul className="breadcrumb">
        {items.map((item, key) =>
          items.length === key + 1 ? renderChild(item) : renderParent(item),
        )}
      </ul>
    </nav>
  );
});

export default Breadcrumb;
