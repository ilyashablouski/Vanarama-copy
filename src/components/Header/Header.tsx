/* eslint-disable @typescript-eslint/no-unused-expressions */
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
import PersonCircleSharp from '@vanarama/uibook/lib/assets/icons/PersonCircleSharp';
import HomeOutline from '@vanarama/uibook/lib/assets/icons/HomeOutline';
import ReceiptOutline from '@vanarama/uibook/lib/assets/icons/ReceiptOutline';
import CarOutline from '@vanarama/uibook/lib/assets/icons/CarOutline';
import LogOutOutline from '@vanarama/uibook/lib/assets/icons/LogOutOutline';
import Menu from '@vanarama/uibook/lib/assets/icons/Menu';
import Close from '@vanarama/uibook/lib/assets/icons/Close';
import Call from '@vanarama/uibook/lib/assets/icons/Call';

import { ILinkProps } from '../RouterLink/interface';
import RouterLink from '../RouterLink/RouterLink';
import HeaderMenu from './HeaderMenu';
import {
  PersonByToken_personByToken as Person,
  PersonByToken,
} from '../../../generated/PersonByToken';

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

  const [isMenuOpen, setOpenMenu] = useState(false);
  const [isMyAccountOpen, setOpenMyAccount] = useState(false);

  useEffect(() => {
    if (!person) {
      localForage.getItem('person').then(value => {
        if ((value as PersonByToken)?.personByToken)
          setPerson((value as PersonByToken)?.personByToken as Person);
      });
    }
    setOpenMyAccount(false);
  }, [person, router]);

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
            <>
              <Button
                withoutDefaultClass
                fill="clear"
                onClick={() => setOpenMyAccount(!isMyAccountOpen)}
                className="header-account--toggle"
                label={
                  <>
                    <Icon icon={<PersonCircleSharp />} size="xsmall" />
                    <span>My Account</span>
                  </>
                }
              />
              <div
                className={cx('header-account--content', {
                  '-open': isMyAccountOpen,
                })}
              >
                <div className="header-account--header">
                  <span>
                    Hi
                    {person?.firstName &&
                      person?.lastName &&
                      `, ${person?.firstName} ${person?.lastName}`}
                  </span>
                </div>
                <ul className="header-account--nav">
                  <li>
                    <RouterLink
                      className="header-account--link"
                      link={{
                        href: '/account/my-details/[uuid]',
                        label: 'Dashboard',
                      }}
                      as={`/account/my-details/${person.uuid}?partyByUuid=${person.partyUuid}`}
                    >
                      <Icon icon={<HomeOutline />} size="xsmall" />
                      <span>Dashboard</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      className="header-account--link"
                      link={{
                        href: '/account/my-quotes/[partyByUuid]',
                        label: 'My Quotes',
                      }}
                      as={`/account/my-quotes/${person.partyUuid}`}
                    >
                      <Icon icon={<ReceiptOutline />} size="xsmall" />
                      <span>My Quotes</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      className="header-account--link"
                      link={{
                        href: '/account/my-orders/[partyByUuid]',
                        label: 'My Orders',
                      }}
                      as={`/account/my-orders/${person.partyUuid}`}
                    >
                      <Icon icon={<CarOutline />} size="xsmall" />
                      <span>My Orders</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      className="header-account--link"
                      link={{ href: '#', label: 'Log Out' }}
                      onClick={async () => {
                        await localForage.clear();
                        router.reload();
                      }}
                    >
                      <Icon icon={<LogOutOutline />} size="xsmall" />
                      <span>Log Out</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </>
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
