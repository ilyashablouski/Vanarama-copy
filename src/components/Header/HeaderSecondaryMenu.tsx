/* eslint-disable import/no-cycle */
import React, { FC, memo } from 'react';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink } from './Header';

export interface IHeaderSecondaryMenuProps extends IBaseProps {
  childrenLinks: IHeaderLink[];
  title: string;
}

const HeaderSecondaryMenu: FC<IHeaderSecondaryMenuProps> = memo(props => {
  const { childrenLinks, title } = props;

  const linkClassName = (classes: {
    title?: boolean;
    open?: boolean;
    highlight?: boolean;
    half?: boolean;
  }) =>
    cx('menu-li', {
      'menu-title': classes.title,
      '-open': classes.open,
      '-highlight': classes.highlight,
      '-span-half': classes.half,
    });

  return (
    <div
      className="menu-secondary--wrapper-outer"
      data-testid="menu-secondary--wrapper-outer"
    >
      <div className="menu-secondary--wrapper-inner">
        <ul className="menu-secondary">
          <li className={linkClassName({ title: true })}>{title}</li>
          {childrenLinks.map((linkSecondary: IHeaderLink) => (
            <li
              key={linkSecondary.label}
              className={linkClassName({
                highlight: linkSecondary.highlight,
              })}
            >
              <RouterLink link={linkSecondary}>
                {/* {linkSecondary.highlight && (
                  <Icon name="FlameSharp" color="orange" size="xsmall" />
                )} */}
                {linkSecondary.label}
              </RouterLink>
            </li>
          ))}
        </ul>
        {/* {renderChildrenMenu()} */}
      </div>
    </div>
  );
});

export default HeaderSecondaryMenu;
