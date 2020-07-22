/* eslint-disable import/no-cycle */
import React, { FC, memo } from 'react';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Logo from '@vanarama/uibook/lib/components/atoms/logo';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';

// import Menu from '@vanarama/uibook/lib/assets/icons/Menu';

import { ILinkProps } from '../RouterLink/interface';
import RouterLink from '../RouterLink/RouterLink';
import HeaderMenu from './HeaderMenu';

export interface IHeaderLink extends ILinkProps {
  highlight?: boolean;
}

export interface IHeaderProps extends IBaseProps {
  topBarLinks: IHeaderLink[];
  loginLink: ILinkProps;
  phoneNumberLink: ILinkProps;
}

const Header: FC<IHeaderProps> = memo(props => {
  const { className, topBarLinks, loginLink, phoneNumberLink } = props;

  // const renderChildrenMenu = (
  //   childrenLinks: IHeaderLink[],
  //   title: string,
  //   open?: boolean,
  // ) => {
  //   return (
  //     <ul className={cx('menu-tertiary', { '-open': open })}>
  //       <li className={linkClassName({ title: true })}>{title}</li>
  //       {childrenLinks.map((linkSecondary: IHeaderLink) => (
  //         <li
  //           key={linkSecondary.label}
  //           className={linkClassName({
  //             highlight: linkSecondary.highlight,
  //             half: true,
  //           })}
  //         >
  //           <RouterLink link={linkSecondary}>{linkSecondary.label}</RouterLink>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // };

  return (
    <header className={cx('header', className)} data-testid="header">
      <div className="header-content">
        <RouterLink
          link={{ href: '/', label: '' }}
          className="logo header-logo"
          classNames={{ color: 'orange', plain: true }}
        >
          <Logo asset="vanarama" />
        </RouterLink>
        <label className="header-search" htmlFor="search">
          <input
            className="header-search--input"
            id="search"
            type="text"
            placeholder="Search for Vehicles…"
          />
          {/* <div className="header-search--results -is-hidden" /> */}
        </label>
        <RouterLink link={phoneNumberLink} className="header-tel">
          {/* <Icon name="Call" size="xsmall" /> */}
          01442 838195
        </RouterLink>
        <div className="header-account">
          <Button
            className="header-account--toggle"
            fill="outline"
            label={<RouterLink link={loginLink}>Login</RouterLink>}
          />
        </div>
        <HeaderMenu menuLinks={topBarLinks} />
      </div>
    </header>
  );
});

export default Header;
