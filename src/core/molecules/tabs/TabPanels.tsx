import cx from 'classnames';
import React from 'react';
import { IBaseProps } from '../../interfaces/base';

interface IProps extends IBaseProps {}

const TabPanels: React.FC<IProps> = ({ children, className, dataTestId }) => (
  <div className={cx('tabs__panel', className)} data-testid={dataTestId}>
    {children}
  </div>
);

export default TabPanels;
