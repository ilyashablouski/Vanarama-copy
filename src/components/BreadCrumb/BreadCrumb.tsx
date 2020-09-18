import React, { FC, memo } from 'react';
import cx from 'classnames';
import ChevronBack from '@vanarama/uibook/lib/assets/icons/ChevronBack';
import ChevronForward from '@vanarama/uibook/lib/assets/icons/ChevronForward';
import Text from '@vanarama/uibook/lib/components/atoms/text';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import { ILink } from '@vanarama/uibook/lib/interfaces/link';

import RouterLink from '../RouterLink/RouterLink';

interface IBreadcrumbLink {
  link: ILink;
  as?: string;
}

interface IBreadcrumbProps extends IBaseProps {
  items: IBreadcrumbLink[] | null;
}

const BreadCrumb: FC<IBreadcrumbProps> = memo(props => {
  const { className, items = [], dataTestId } = props;

  const renderParent = (item: IBreadcrumbLink) => (
    <li className="breadcrumb-item -parent">
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
    <li className="breadcrumb-item -child">
      <Text size="small" color="darker" className="breadcrumb-item--child">
        {item.link.label}
      </Text>
    </li>
  );

  return items?.length ? (
    <nav data-testid={dataTestId}>
      <ol className={cx('breadcrumb', className)}>
        {items.map((item, key) =>
          items.length === key + 1 ? renderChild(item) : renderParent(item),
        )}
      </ol>
    </nav>
  ) : null;
});

export default BreadCrumb;
