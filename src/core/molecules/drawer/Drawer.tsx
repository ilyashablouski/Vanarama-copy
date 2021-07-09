import React from 'react';
import Text from 'core/atoms/text/Text';
import cx from 'classnames';
import Close from 'core/assets/icons/Close';
import Icon from 'core/atoms/icon';
import Spinner from 'core/molecules/drawer/Spinner';
import { Component } from '../../../types/common';

interface IProps {
  renderContent?: Component;
  renderActions?: Component;
  isLoading?: boolean;
  onCloseDrawer: () => void;
  isShowDrawer: boolean;
  title: string;
}
const Drawer = ({
  onCloseDrawer,
  isShowDrawer,
  renderContent,
  title,
  renderActions,
  isLoading,
}: IProps) => {
  return (
    <>
      <div
        className={cx('srp-f-flyout', {
          open: isShowDrawer,
        })}
      >
        <Text tag="div" className="title">
          <span>{title}</span>
          <Icon
            icon={<Close />}
            onClick={onCloseDrawer}
            className="close-filter"
          />
        </Text>
        {renderContent || null}
        {renderActions || null}
      </div>
      <div
        role="presentation"
        onClick={onCloseDrawer}
        className={cx('srp-f-mask', {
          open: isShowDrawer,
          updating: isLoading,
        })}
      >
        <Spinner />
      </div>
    </>
  );
};

export default Drawer;
