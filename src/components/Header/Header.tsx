/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import cx from 'classnames';
import localForage from 'localforage';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Logo from '@vanarama/uibook/lib/components/atoms/logo';
import { ILinkProps } from '../RouterLink/interface';
import RouterLink from '../RouterLink/RouterLink';
// import HeaderMenu from './HeaderMenu';
import {
  GetPerson_getPerson as Person,
  GetPerson,
} from '../../../generated/GetPerson';
import { useMobileViewport } from '../../hooks/useMediaQuery';

const HeaderMenu = dynamic(() => import('./HeaderMenu'));
const Button = dynamic(() =>
  import('@vanarama/uibook/lib/components/atoms/button'),
);
const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    ssr: false,
  },
);
const SearchCircle = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/SearchOutline'),
  {
    ssr: false,
  },
);
const PersonCircleSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/PersonCircleSharp'),
  {
    ssr: false,
  },
);
const HomeOutline = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/HomeOutline'),
  {
    ssr: false,
  },
);
const ReceiptOutline = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/ReceiptOutline'),
  {
    ssr: false,
  },
);
const CarOutline = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/CarOutline'),
  {
    ssr: false,
  },
);
const Menu = dynamic(() => import('@vanarama/uibook/lib/assets/icons/Menu'), {
  ssr: false,
});
const LogOutOutline = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/LogOutOutline'),
  {
    ssr: false,
  },
);
const Close = dynamic(() => import('@vanarama/uibook/lib/assets/icons/Close'), {
  ssr: false,
});
const Call = dynamic(() => import('@vanarama/uibook/lib/assets/icons/Call'), {
  ssr: false,
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

  return (
    <header
      style={{ position: useMobileViewport() ? 'fixed' : 'relative' }}
      className={cx('header', className)}
      data-testid="header"
    >
      {' '}
      <div className="header-content">
        {' '}
        <RouterLink
          link={{ href: '/', label: '' }}
          className="logo header-logo"
          classNames={{ color: 'orange', plain: true }}
        >
          {' '}
          <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
            <Logo asset="vanarama" />{' '}
          </LazyLoadComponent>
        </RouterLink>{' '}
        {!useMobileViewport() && (
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
        <LazyLoadComponent visibleByDefault={typeof window === 'undefined'}>
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
                          href: `/account/my-details/[uuid]`,
                          label: 'Dashboard',
                          query: { partyByUuid: person.partyUuid },
                        }}
                        as={`/account/my-details/${person.uuid}?partyByUuid=${person.partyUuid}`}
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
                            ? '/account/my-quotes/[partyByUuid]'
                            : `/account/my-details/[uuid]`,
                          label: 'My Quotes',
                          query: {
                            partyByUuid: person.partyUuid,
                            uuid: person.uuid,
                          },
                        }}
                        as={
                          quotesLength
                            ? `/account/my-quotes/${person.partyUuid}?uuid=${person.uuid}`
                            : `/account/my-details/${person.uuid}?partyByUuid=${person.partyUuid}`
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
                            ? '/account/my-orders/[partyByUuid]'
                            : `/account/my-details/[uuid]`,
                          label: 'My Orders',
                          query: {
                            partyByUuid: person.partyUuid,
                            uuid: person.uuid,
                          },
                        }}
                        as={
                          ordersLength
                            ? `/account/my-orders/${person.partyUuid}?uuid=${person.uuid}`
                            : `/account/my-details/${person.uuid}?partyByUuid=${person.partyUuid}`
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
                className="header-account--toggle"
                fill="clear"
                label={
                  <RouterLink link={loginLink}>
                    {' '}
                    <span>Login / Register</span>{' '}
                  </RouterLink>
                }
              />
            )}{' '}
          </div>{' '}
        </LazyLoadComponent>
        <HeaderMenu
          menuLinks={topBarLinks}
          open={isMenuOpen}
          onClickMenu={() => setOpenMenu(false)}
        />{' '}
        <Button
          className={cx('header-navtoggle', { '-open': isMenuOpen })}
          onClick={() => setOpenMenu(!isMenuOpen)}
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
