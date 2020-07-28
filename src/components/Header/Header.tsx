/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import localForage from 'localforage';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Logo from '@vanarama/uibook/lib/components/atoms/logo';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';

import SearchCircle from '@vanarama/uibook/lib/assets/icons/SearchOutline';
import Menu from '@vanarama/uibook/lib/assets/icons/Menu';
import Close from '@vanarama/uibook/lib/assets/icons/Close';
import Call from '@vanarama/uibook/lib/assets/icons/Call';

import { ILinkProps } from '../RouterLink/interface';
import RouterLink from '../RouterLink/RouterLink';
import HeaderMenu from './HeaderMenu';
import { PersonByToken_personByToken as Person } from '../../../generated/PersonByToken';

export interface IHeaderLink extends ILinkProps {
  id?: string;
  as?: string;
  highlight?: boolean;
}

export interface IHeaderProps extends IBaseProps {
  topBarLinks: IHeaderLink[];
  loginLink: ILinkProps;
  phoneNumberLink: ILinkProps;
}

const Header: FC<IHeaderProps> = memo(props => {
  const router = useRouter();
  const { className, topBarLinks, loginLink, phoneNumberLink } = props;
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const localPerson: Person = await localForage.getItem('person');
      if (localPerson) {
        setPerson(localPerson);
      }
    };
    fetchData();
  }, [router]);

  const [isMenuOpen, setOpenMenu] = useState(false);

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
          <Icon icon={<SearchCircle />} color="darker" />
          <input
            className="header-search--input"
            id="search"
            type="text"
            placeholder="Search for Vehicles…"
          />
          {/* <div className="header-search--results -is-hidden" /> */}
        </label>
        <RouterLink link={phoneNumberLink} className="header-tel">
          <Icon icon={<Call />} size="xsmall" />
          <span>01442 838195</span>
        </RouterLink>
        <div className="header-account">
          {person ? (
            <Button
              className="header-account--toggle"
              fill="clear"
              label={
                <RouterLink link={loginLink}>
                  <span>My Account</span>
                </RouterLink>
              }
            />
          ) : (
            <Button
              className="header-account--toggle"
              fill="clear"
              label={
                <RouterLink link={loginLink}>
                  <span>Login / Register</span>
                </RouterLink>
              }
            />
          )}
        </div>
        <HeaderMenu
          menuLinks={topBarLinks}
          open={isMenuOpen}
          onClickMenu={() => setOpenMenu(false)}
        />
        <Button
          className={cx('header-navtoggle', { '-open': isMenuOpen })}
          onClick={() => setOpenMenu(!isMenuOpen)}
          withoutDefaultClass
          label={
            <>
              <Icon icon={<Menu />} color="darker" />
              <Icon icon={<Close />} color="darker" />
            </>
          }
          size="expand"
          color="inherit"
          fill="clear"
        />
      </div>
    </header>
  );
});

export default Header;
