import React, { ReactNode } from 'react';
import cx from 'classnames';

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  onCloseDrawer: () => void;
}

const CenteredDrawer = ({ children, isOpen, onCloseDrawer }: IProps) => {
  return (
    <>
      <div className={cx('centered-drawer', { open: isOpen })} />
      <div className={cx('centered-drawer-wrapper page:', { open: isOpen })}>
        <div className="empty-area" />
        <div className="children">{children}</div>
        <div
          role="presentation"
          className="closing-area"
          onClick={onCloseDrawer}
        />
      </div>
    </>
  );
};

export default CenteredDrawer;
