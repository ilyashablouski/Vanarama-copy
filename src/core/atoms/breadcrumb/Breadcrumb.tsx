import React, { FC, memo } from 'react';
import cx from 'classnames';

import Icon from '../icon';
import Link from '../link';
import Text from '../text';

import ChevronBack from '../../assets/icons/ChevronBack';
import ChevronForward from '../../assets/icons/ChevronForward';

import { IBreadcrumbProps } from './interfaces';
import { ILink } from '../../interfaces/link';

const Breadcrumb: FC<IBreadcrumbProps> = memo(props => {
  const { className, items = [], dataTestId } = props;

  const renderParent = (item: ILink, key: number) => (
    <li className="breadcrumb-item -parent" key={key}>
      <Link
        color="teal"
        size="small"
        className="breadcrumb-item--backlink"
        href={item.href}
      >
        Back to {item.label}
        <Icon icon={<ChevronBack />} size="xsmall" color="medium" />
      </Link>
      <Link
        color="teal"
        size="small"
        className="breadcrumb-item--parent"
        href={item.href}
      >
        {item.label}
      </Link>
      <Icon icon={<ChevronForward />} size="xsmall" color="medium" />
    </li>
  );

  const renderChild = (item: ILink, key: number) => (
    <li className="breadcrumb-item -child" key={key}>
      <Text size="small" color="darker" className="breadcrumb-item--child">
        {item.label}
      </Text>
    </li>
  );

  return items ? (
    <nav data-testid={dataTestId}>
      <ol className={cx('breadcrumb', className)}>
        {items.map((item, key) => {
          if (items.length === key + 1) {
            // Last element.
            return renderChild(item, key);
          }
          // All other elements.
          return renderParent(item, key);
        })}
      </ol>
    </nav>
  ) : null;
});

Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
