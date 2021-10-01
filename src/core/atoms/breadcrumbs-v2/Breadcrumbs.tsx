import React, { FC, memo } from 'react';
import BreadcrumbsItem from './BreabcrumbsItem';
import { IBreadcrumbLink, IBreadcrumbProps } from './helpers';

const renderBreadcrumbsItem = (
  itemData: IBreadcrumbLink,
  index: number,
  items: IBreadcrumbLink[],
) => {
  // Back breadcrumb link for mobile version
  const isMobileBackBreadcrumbLink = items.length === index + 2;
  const isLastBreadcrumbsItem = items.length === index + 1;

  return (
    <React.Fragment key={itemData.link.label}>
      <BreadcrumbsItem
        isLastItem={isLastBreadcrumbsItem}
        isMobileBackLink={isMobileBackBreadcrumbLink}
        itemData={itemData}
      />
    </React.Fragment>
  );
};

const Breadcrumbs: FC<IBreadcrumbProps> = memo(({ items, dataTestId }) => {
  if (!items?.length) {
    return null;
  }

  return (
    <nav data-testid={dataTestId ?? 'breadcrumbs'}>
      <ul className="breadcrumb">{items.map(renderBreadcrumbsItem)}</ul>
    </nav>
  );
});

export default Breadcrumbs;
