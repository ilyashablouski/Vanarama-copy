import React from 'react';
import { IBreadcrumbLink } from 'core/atoms/breadcrumbs-v2/helpers';
import dynamic from 'next/dynamic';
import ChevronForward from 'core/assets/icons/ChevronForward';
import ChevronBack from 'core/assets/icons/ChevronBack';
import RouterLink from '../../../components/RouterLink';
import useMediaQuery from '../../../hooks/useMediaQuery';
import Skeleton from '../../../components/Skeleton';

const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  isLastItem: boolean;
  isMobileBackLink: boolean;
  itemData: IBreadcrumbLink;
}

function BreadcrumbsItem({ isLastItem, isMobileBackLink, itemData }: IProps) {
  const isDesktopOrTablet = useMediaQuery('(min-width: 768px)');

  if (isLastItem) {
    return (
      <li
        className="breadcrumb-item -child"
        key={itemData.link.label}
        style={{ display: isDesktopOrTablet ? 'grid' : 'none' }}
      >
        <Text size="small" color="darker" className="breadcrumb-item--child">
          {itemData.link.label}
        </Text>
      </li>
    );
  }

  return isDesktopOrTablet ? (
    <li className="breadcrumb-item -parent" key={`${itemData.link.label}`}>
      <RouterLink
        classNames={{ color: 'teal', size: 'small' }}
        className="breadcrumb-item--parent"
        link={itemData.link}
        as={itemData.as}
      >
        {itemData.link.label}
      </RouterLink>
      <Icon icon={<ChevronForward />} size="xsmall" color="medium" />
    </li>
  ) : (
    <li
      className="breadcrumb-item -parent"
      key={`${itemData.link.label}`}
      style={{
        display: isMobileBackLink ? 'grid' : 'none',
      }}
    >
      <RouterLink
        classNames={{ color: 'teal', size: 'small' }}
        className="breadcrumb-item--parent"
        link={itemData.link}
        as={itemData.as}
      >
        <Icon icon={<ChevronBack />} color="teal" />
        {isMobileBackLink && 'Back to '}
        {itemData.link.label}
      </RouterLink>
    </li>
  );
}

export default BreadcrumbsItem;
