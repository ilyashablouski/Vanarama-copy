/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import cx from 'classnames';
import localForage from 'localforage';
import { IBaseProps } from 'core/interfaces/base';
import Logo from 'core/atoms/logo';
import Button from 'core/atoms/button';
import Icon from 'core/atoms/icon';
import HeaderMenu from './HeaderMenu';
import { ILinkProps } from '../RouterLink/interface';
import RouterLink from '../RouterLink/RouterLink';
import {
  GetPerson_getPerson as Person,
  GetPerson,
} from '../../../generated/GetPerson';
import useMediaQuery from '../../hooks/useMediaQuery';

const SearchCircle = dynamic(() => import('core/assets/icons/SearchOutline'), {
  ssr: false,
});
const PersonCircleSharp = dynamic(
  () => import('core/assets/icons/PersonCircleSharp'),
  {
    ssr: true,
  },
);
const HomeOutline = dynamic(() => import('core/assets/icons/HomeOutline'), {
  ssr: false,
});
const ReceiptOutline = dynamic(
  () => import('core/assets/icons/ReceiptOutline'),
  {
    ssr: false,
  },
);
const CarOutline = dynamic(() => import('core/assets/icons/CarOutline'), {
  ssr: false,
});
const Menu = dynamic(() => import('core/assets/icons/Menu'), {
  ssr: true,
});
const LogOutOutline = dynamic(() => import('core/assets/icons/LogOutOutline'), {
  ssr: false,
});
const Close = dynamic(() => import('core/assets/icons/Close'), {
  ssr: false,
});
const Call = dynamic(() => import('core/assets/icons/Call'), {
  ssr: true,
});

export interface IHeaderPromoImage {
  legacyUrl?: string;
  url: string;
  image: {
    fileName: string;
    url: string;
  };
}
export interface IHeaderLink extends ILinkProps {
  id?: string;
  as?: string;
  highlight?: boolean;
  highlightLabel?: string;
  promotionalImage?: IHeaderPromoImage;
}

export interface IHeaderProps extends IBaseProps {
  topBarLinks: IHeaderLink[];
  loginLink: ILinkProps;
  phoneNumberLink: ILinkProps;
  onLogOut: () => void;
}

export const Header: FC<IHeaderProps> = memo(props => {
  const router = useRouter();
  const {
    className,
    topBarLinks,
    loginLink,
    phoneNumberLink,
    onLogOut,
  } = props;
  const [person, setPerson] = useState<Person | null>(null);
  const [ordersLength, setOrdersLength] = useState<number | null>(null);
  const [quotesLength, setQuotesLength] = useState<number | null>(null);
  const [isMenuOpen, setOpenMenu] = useState(false);
  const [isMyAccountOpen, setOpenMyAccount] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1216px)');

  useEffect(() => {
    if (!person) {
      localForage.getItem('person').then(value => {
        if ((value as GetPerson)?.getPerson)
          setPerson((value as GetPerson)?.getPerson as Person);
      });
    }
    if (!ordersLength) {
      localForage.getItem('ordersLength').then(value => {
        if (value) setOrdersLength(value as number);
      });
    }
    if (!quotesLength) {
      localForage.getItem('quotesLength').then(value => {
        if (value) setQuotesLength(value as number);
      });
    }
    setOpenMyAccount(false);
  }, [person, ordersLength, quotesLength, router]);

  useEffect(() => {
    setOpenMenu(false);
  }, [router]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('-lock');
    } else {
      document.body.classList.remove('-lock');
    }
  }, [isMenuOpen]);

  return (
    <header className={cx('header', className)} data-testid="header">
      {' '}
      <div className="header-content">
        {' '}
        <RouterLink
          link={{ href: '/', label: '' }}
          className="logo header-logo"
          classNames={{ color: 'orange', plain: true }}
        >
          {' '}
          <Logo asset="vanarama" />{' '}
        </RouterLink>{' '}
        {isDesktop && (
          <label className="header-search" htmlFor="search">
            {' '}
            {/* {TODO: commit for this search lines should be reverted after implement search functionality} */}
            <Icon icon={<SearchCircle />} />{' '}
            <input
              className="header-search--input"
              id="search"
              type="text"
              disabled
              placeholder=""
            />{' '}
            {/* <div className="header-search--results -is-hidden" /> */}{' '}
          </label>
        )}
        <RouterLink link={phoneNumberLink} className="header-tel">
          {' '}
          <Icon icon={<Call />} size="xsmall" /> <span>01442 838195</span>{' '}
        </RouterLink>{' '}
        <div className="header-account">
          {' '}
          {person ? (
            <>
              {' '}
              <Button
                withoutDefaultClass
                fill="clear"
                onClick={() => setOpenMyAccount(!isMyAccountOpen)}
                className="header-account--toggle"
                label={
                  <>
                    {' '}
                    <Icon icon={<PersonCircleSharp />} size="xsmall" />{' '}
                    <span>My Account</span>{' '}
                  </>
                }
              />{' '}
              <div
                className={cx('header-account--content', {
                  '-open': isMyAccountOpen,
                })}
              >
                {' '}
                <div className="header-account--header">
                  {' '}
                  <span>
                    {' '}
                    Hi{' '}
                    {person?.firstName &&
                      person?.lastName &&
                      `, ${person?.firstName} ${person?.lastName}`}{' '}
                  </span>{' '}
                </div>{' '}
                <ul className="header-account--nav">
                  {' '}
                  <li>
                    {' '}
                    <RouterLink
                      className="header-account--link"
                      link={{
                        href: `/account/my-details`,
                        label: 'Dashboard',
                      }}
                      as="/account/my-details"
                    >
                      {' '}
                      <Icon icon={<HomeOutline />} size="xsmall" />{' '}
                      <span>Dashboard</span>{' '}
                    </RouterLink>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <RouterLink
                      className="header-account--link"
                      link={{
                        href: quotesLength
                          ? '/account/my-quotes'
                          : `/account/my-details`,
                        label: 'My Quotes',
                      }}
                      as={
                        quotesLength
                          ? '/account/my-quotes'
                          : '/account/my-details'
                      }
                    >
                      {' '}
                      <Icon icon={<ReceiptOutline />} size="xsmall" />{' '}
                      <span>My Quotes</span>{' '}
                    </RouterLink>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <RouterLink
                      className="header-account--link"
                      link={{
                        href: ordersLength
                          ? '/account/my-orders'
                          : `/account/my-details`,
                        label: 'My Orders',
                      }}
                      as={
                        ordersLength
                          ? `/account/my-orders`
                          : '/account/my-details'
                      }
                    >
                      {' '}
                      <Icon icon={<CarOutline />} size="xsmall" />{' '}
                      <span>My Orders</span>{' '}
                    </RouterLink>{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <RouterLink
                      className="header-account--link"
                      link={{ href: router.pathname, label: 'Log Out' }}
                      as={router.asPath}
                      onClick={async () => {
                        await onLogOut();
                        setPerson(null);
                      }}
                      replace
                    >
                      {' '}
                      <Icon icon={<LogOutOutline />} size="xsmall" />{' '}
                      <span>Log Out</span>{' '}
                    </RouterLink>{' '}
                  </li>{' '}
                </ul>{' '}
              </div>{' '}
            </>
          ) : (
            <Button
              withoutDefaultClass
              className="header-account--toggle"
              fill="clear"
              label={
                <RouterLink link={loginLink}>
                  {!isDesktop ? (
                    <Icon icon={<PersonCircleSharp />} size="xsmall" />
                  ) : (
                    <span>Login / Register</span>
                  )}
                </RouterLink>
              }
            />
          )}{' '}
        </div>{' '}
        <HeaderMenu
          menuLinks={topBarLinks}
          open={isMenuOpen}
          onClickMenu={() => {
            setOpenMenu(false);
          }}
        />{' '}
        <Button
          className={cx('header-navtoggle', { '-open': isMenuOpen })}
          onClick={() => {
            setOpenMenu(!isMenuOpen);
          }}
          withoutDefaultClass
          label={
            <>
              {' '}
              <Icon icon={<Menu />} color="darker" />{' '}
              <Icon icon={<Close />} color="darker" />{' '}
            </>
          }
          size="expand"
          color="inherit"
          fill="clear"
        />{' '}
      </div>{' '}
    </header>
  );
});

export default Header;
