import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../interfaces/base';
import { useTabsContext } from './TabsContext';
import { panelId, tabId } from './utils';

interface IProps extends IBaseProps {
  index: number;
}

const Tab: React.FC<IProps> = ({ children, className, dataTestId, index }) => {
  const { activeIndex, baseId, onChange } = useTabsContext();
  const active = index === activeIndex;
  return (
    <button
      id={tabId(index, baseId)}
      aria-controls={panelId(index, baseId)}
      aria-selected={active}
      className={cx(className, { '-active': active })}
      data-testid={dataTestId}
      onClick={e => onChange(index, e)}
      role="tab"
      type="button"
    >
      {children}
    </button>
  );
};

export default React.memo(Tab);
