/* eslint-disable import/no-cycle */
import React, { FC, memo } from 'react';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import HeaderMenuLink from './HeaderMenuLink';
import { IHeaderLink } from './Header';

export interface IHeaderMenuProps extends IBaseProps {
  menuLinks: IHeaderLink[];
}

const HeaderMenu: FC<IHeaderMenuProps> = memo(props => {
  const { menuLinks } = props;

  return (
    <nav id="nav" className="menu">
      <ul className="menu-primary">
        <li className="menu-li menu-title">Menu</li>
        {!!menuLinks.length &&
          menuLinks.map(entry => (
            <HeaderMenuLink key={entry.label} link={entry} />
          ))}
      </ul>
    </nav>
  );
});

export default HeaderMenu;
