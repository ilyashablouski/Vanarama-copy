import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../interfaces/base';
import { useTabsContext } from './TabsContext';
import { panelId, tabId } from './utils';

interface IProps extends IBaseProps {
  index: number;
}

const TabPanel: React.FC<IProps> = ({
  children,
  className,
  dataTestId,
  index,
}) => {
  const { activeIndex, baseId } = useTabsContext();
  const active = index === activeIndex;
  return (
    <div
      id={panelId(index, baseId)}
      aria-labelledby={tabId(index, baseId)}
      className={cx(className, { 'tabs--active': active })}
      data-testid={dataTestId}
      hidden={!active}
      role="tabpanel"
    >
      {children}
    </div>
  );
};

export default TabPanel;
