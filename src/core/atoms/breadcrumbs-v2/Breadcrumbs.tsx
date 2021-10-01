import React, { FC, memo } from 'react';
import BreadcrumbsItem from './BreabcrumbsItem';
import { IBreadcrumbLink, IBreadcrumbProps } from './helpers';

const Breadcrumbs: FC<IBreadcrumbProps> = memo(({ items, dataTestId }) => {
  if (!items?.length) {
    return null;
  }

  const renderBreadcrumbsItem = (itemData: IBreadcrumbLink, index: number) => {
    // Back breadcrumb link for mobile version
    const isMobileBackBreadcrumbLink = items.length - 2 === index;
    const isLastBreadcrumbsItem = items.length === index + 1;

    return (
      <BreadcrumbsItem
        isLastItem={isLastBreadcrumbsItem}
        isMobileBackLink={isMobileBackBreadcrumbLink}
        itemData={itemData}
      />
    );
  };

  return (
    <nav data-testid={dataTestId ?? 'breadcrumbs'}>
      <ul className="breadcrumb">{items.map(renderBreadcrumbsItem)}</ul>
    </nav>
  );
});

export default Breadcrumbs;
