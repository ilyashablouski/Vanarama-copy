import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../interfaces/base';
import { useTabsContext } from './TabsContext';

interface ITabListProps extends IBaseProps {}

const TabList: React.FC<ITabListProps> = ({
  children,
  className,
  dataTestId,
}) => {
  const { align, size, variant } = useTabsContext();
  return (
    <nav
      className={cx(`tabs -content-end -${size}`, {
        '-alt': variant === 'alternative',
        '-center': align === 'center',
        '-expand': align === 'expand',
      })}
    >
      <div
        className={cx('tabs__list-wrap', className)}
        data-testid={dataTestId}
      >
        <div className="tabs__list" role="tablist">
          {children}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(TabList);
