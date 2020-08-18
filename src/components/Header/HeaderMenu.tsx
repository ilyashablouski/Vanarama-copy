/* eslint-disable import/no-cycle */
import React, { FC, memo } from 'react';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import HeaderMenuLink from './HeaderMenuLink';
import { IHeaderLink } from './Header';
import RouterLink from '../RouterLink/RouterLink';

export interface IHeaderMenuProps extends IBaseProps {
  menuLinks: IHeaderLink[];
  open: boolean;
  onClickMenu: () => void;
}

const HeaderMenu: FC<IHeaderMenuProps> = memo(props => {
  const { menuLinks, open, onClickMenu } = props;

  return (
    <nav
      id="nav"
      className={cx('menu', {
        '-open': open,
      })}
    >
      <ul className="menu-primary">
        <li className="menu-li menu-title">
          <RouterLink
            link={{ label: '', href: '' }}
            onClick={() => onClickMenu()}
            dataTestId="menu-title"
          >
            Menu
          </RouterLink>
        </li>
        {!!menuLinks.length &&
          menuLinks.map(entry => (
            <HeaderMenuLink key={entry.id} link={entry} isMenuOpen={open} />
          ))}
      </ul>
    </nav>
  );
});

export default HeaderMenu;
