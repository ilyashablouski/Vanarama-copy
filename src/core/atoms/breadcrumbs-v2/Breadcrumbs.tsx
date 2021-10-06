import React, { FC, memo } from 'react';
import ChevronBack from 'core/assets/icons/ChevronBack';
import Icon from 'core/atoms/icon';
import BreadcrumbsItem from './BreabcrumbsItem';
import { IBreadcrumbLink, IBreadcrumbProps } from './helpers';
import RouterLink from '../../../components/RouterLink';

const renderBreadcrumbsItem = (
  itemData: IBreadcrumbLink,
  index: number,
  items: IBreadcrumbLink[],
) => {
  const isLastBreadcrumbsItem = items.length === index + 1;

  return (
    <React.Fragment key={itemData.link.label}>
      <BreadcrumbsItem isLastItem={isLastBreadcrumbsItem} itemData={itemData} />
    </React.Fragment>
  );
};

const Breadcrumbs: FC<IBreadcrumbProps> = memo(({ items, dataTestId }) => {
  if (!items?.length) {
    return null;
  }

  // Back breadcrumb link for mobile version
  const backBreadcrumbLink = items[items.length - 2];

  return (
    <>
      <nav
        className="breadcrumbs breadcrumbs--mobile"
        data-testid={dataTestId ?? 'breadcrumbs'}
      >
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <RouterLink
              classNames={{ color: 'teal', size: 'small' }}
              className="breadcrumbs__link"
              link={backBreadcrumbLink.link}
              as={backBreadcrumbLink.as}
            >
              <Icon icon={<ChevronBack />} color="teal" />
              Back to {backBreadcrumbLink.link.label}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <nav
        className="breadcrumbs breadcrumbs--desktop"
        data-testid={dataTestId ?? 'breadcrumbs'}
      >
        <ul className="breadcrumbs__list">
          {items.map(renderBreadcrumbsItem)}
        </ul>
      </nav>
    </>
  );
});

export default Breadcrumbs;
