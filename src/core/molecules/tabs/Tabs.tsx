import cx from 'classnames';
import React, { FC } from 'react';
import { useId } from '@reach/auto-id';
import { TabsProvider } from './TabsContext';
import { ITabsProps } from './interfaces';

const Tabs: FC<ITabsProps> = ({
  activeIndex,
  align = 'start',
  children,
  className,
  dataTestId,
  id,
  onChange,
  size = 'regular',
  variant = 'normal',
}) => {
  /**
   * NOTE: Generate a unique and random ID for this Tabs component (unless one is passed in),
   * so we can use it with the accessibility props e.g. aria-controls.
   */
  const baseId = useId(id);
  return (
    <div className={cx('tabs-wrap', className)} data-testid={dataTestId}>
      <TabsProvider
        value={{ activeIndex, align, baseId, onChange, size, variant }}
      >
        {children}
      </TabsProvider>
    </div>
  );
};

export default React.memo(Tabs);
