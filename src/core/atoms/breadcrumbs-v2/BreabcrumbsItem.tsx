import React from 'react';
import { IBreadcrumbLink } from 'core/atoms/breadcrumbs-v2/helpers';
import dynamic from 'next/dynamic';
import ChevronForward from 'core/assets/icons/ChevronForward';
import RouterLink from '../../../components/RouterLink';
import Skeleton from '../../../components/Skeleton';

const Icon = dynamic(() => import('core/atoms/icon'), {
  loading: () => <Skeleton count={1} />,
});
const Text = dynamic(() => import('core/atoms/text'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  isLastItem: boolean;
  itemData: IBreadcrumbLink;
}

function BreadcrumbsItem({ isLastItem, itemData }: IProps) {
  if (isLastItem) {
    return (
      <li className="breadcrumbs__item">
        <Text size="small" color="darker" className="breadcrumbs__text">
          {itemData.link.label}
        </Text>
      </li>
    );
  }

  return (
    <li className="breadcrumbs__item">
      <RouterLink
        classNames={{ color: 'teal', size: 'small' }}
        className="breadcrumbs__link"
        link={itemData.link}
        as={itemData.as}
      >
        {itemData.link.label}
      </RouterLink>
      <Icon icon={<ChevronForward />} size="xsmall" color="medium" />
    </li>
  );
}

export default BreadcrumbsItem;
