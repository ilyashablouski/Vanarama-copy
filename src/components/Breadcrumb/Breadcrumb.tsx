import React, { FC, memo } from 'react';
import dynamic from 'next/dynamic';
import RouterLink from '../RouterLink/RouterLink';
import { IBreadcrumbLink } from './helpers';
import { useMobileViewport } from '../../hooks/useMediaQuery';

import Skeleton from '../Skeleton';

const ChevronBack = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ChevronBack'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const ChevronForward = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ChevronForward'),
  {
    loading: () => <Skeleton count={1} />,
    ssr: false,
  },
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon/'),
  {
    loading: () => <Skeleton count={1} />,
  },
);
const Text = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/text'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IBreadcrumbProps {
  items?: IBreadcrumbLink[] | null;
}

const Breadcrumb: FC<IBreadcrumbProps> = memo(props => {
  const isMobile = useMobileViewport();
  const { items } = props;

  const renderParent = (item: IBreadcrumbLink) => (
    <li className="breadcrumb-item -parent" key={item.link.label}>
      {isMobile ? (
        <RouterLink
          classNames={{ color: 'teal', size: 'small' }}
          className="breadcrumb-item--backlink"
          link={item.link}
          as={item.as}
        >
          <Icon icon={<ChevronBack />} color="teal" />
          Back to {decodeURIComponent(item.link.label)}
        </RouterLink>
      ) : (
        <>
          <RouterLink
            classNames={{ color: 'teal', size: 'small' }}
            className="breadcrumb-item--parent"
            link={item.link}
            as={item.as}
          >
            {decodeURIComponent(item.link.label)}
          </RouterLink>
          <Icon icon={<ChevronForward />} size="xsmall" color="medium" />
        </>
      )}
    </li>
  );

  const renderChild = (item: IBreadcrumbLink) => (
    <li className="breadcrumb-item -child" key={item.link.label}>
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
      <ol className="breadcrumb">
        {items.map((item, key) =>
          items.length === key + 1 ? renderChild(item) : renderParent(item),
        )}
      </ol>
    </nav>
  );
});

export default Breadcrumb;
