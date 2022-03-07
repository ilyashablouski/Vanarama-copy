/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import cx from 'classnames';
import { IBaseProps } from 'core/interfaces/base';
import Logo from 'core/atoms/logo';
import Button from 'core/atoms/button';
import Icon from 'core/atoms/icon';
import BenefitsBar from 'core/organisms/benefits-bar/BenefitsBar';
import ServiceBanner from 'core/molecules/service-banner';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import HeaderMenu from './HeaderMenu';
import { ILinkProps } from '../RouterLink/interface';
import RouterLink from '../RouterLink/RouterLink';
import { GetPerson_getPerson as Person } from '../../../generated/GetPerson';
import { useDesktopViewport } from '../../hooks/useMediaQuery';
import PhoneNumber from '../PhoneNumber/PhoneNumber';
import GlobalSearchContainer from '../../containers/GlobalSearchContainer';
import HeaderWishlistLink from './HeaderWishlistLink';
import { isUserAuthenticated } from '../../utils/authentication';

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

export interface IHeaderPromoImageLink {
  legacyUrl?: string;
  url: string;
  image: {
    width?: number;
    height?: number;
    fileName: string;
    url: string;
  };
}
export interface IHeaderLink extends ILinkProps {
  id?: string;
  as?: string;
  promoImageLink?: IHeaderPromoImageLink;
  promoImagesLinks?: Array<IHeaderPromoImageLink>;
  highlight?: boolean;
  highlightLabel?: string;
}

export interface IHeaderProps extends IBaseProps {
  topBarLinks: IHeaderLink[];
  loginLink: ILinkProps & { as?: string };
  phoneNumberLink: ILinkProps;
  customHomePath?: string;
  onLogOut: () => void;
  person?: Person | null;
  serviceBanner?: IServiceBanner;
}

export const Header: FC<IHeaderProps> = memo(props => {
  const {
    className,
    topBarLinks,
    loginLink,
    phoneNumberLink,
    customHomePath,
    onLogOut,
    person,
    serviceBanner,
  } = props;

  const router = useRouter();
  const [isMenuOpen, setOpenMenu] = useState(false);
  const [isMyAccountOpen, setOpenMyAccount] = useState(false);
  const isDesktop = useDesktopViewport();

  useEffect(() => {
    setOpenMenu(false);
  }, [router.asPath]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('-lock');
    } else {
      document.body.classList.remove('-lock');
    }
  }, [isMenuOpen]);

  const handleMenuClose = useCallback(() => setOpenMyAccount(false), []);

  return (
    <header className={cx('header', className)} data-testid="header">
      <div className="header-content -with-wishlist">
        <RouterLink
          link={{ href: customHomePath || '/', label: '' }}
          classNames={{ color: 'orange', plain: true }}
          className="logo header-logo"
        >
          <Logo assetName="vanarama" />
        </RouterLink>{' '}
        <GlobalSearchContainer />
        <PhoneNumber phoneNumberLink={phoneNumberLink} withIcon />{' '}
        <HeaderWishlistLink />
        <div className="header-account" data-uitestid="header_account">
          {isUserAuthenticated() ? (
            <>
              <Button
                dataUiTestId="header-account-toggle"
                withoutDefaultClass
                fill="clear"
                onClick={() => setOpenMyAccount(!isMyAccountOpen)}
                className="header-account--toggle"
                label={
                  <>
                    <Icon icon={<PersonCircleSharp />} size="xsmall" />{' '}
                    <span>My Account</span>{' '}
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
                    Hi{' '}
                    {person?.firstName &&
                      person?.lastName &&
                      `, ${person?.firstName} ${person?.lastName}`}{' '}
                  </span>
                </div>
                <ul className="header-account--nav">
                  <li>
                    <RouterLink
                      dataUiTestId="header-dashboard-button"
                      onClick={handleMenuClose}
                      className="header-account--link"
                      link={{
                        href: `/account/my-details`,
                        label: 'Dashboard',
                      }}
                      as="/account/my-details"
                    >
                      <Icon icon={<HomeOutline />} size="xsmall" />
                      <span>Dashboard</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      prefetch
                      onClick={handleMenuClose}
                      className="header-account--link"
                      link={{
                        href: '/account/my-quotes',
                        label: 'My Quotes',
                      }}
                      as="/account/my-quotes"
                    >
                      <Icon icon={<ReceiptOutline />} size="xsmall" />{' '}
                      <span>My Quotes</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      prefetch
                      onClick={handleMenuClose}
                      className="header-account--link"
                      link={{
                        href: '/account/my-orders',
                        label: 'My Orders',
                      }}
                      as="/account/my-orders"
                    >
                      <Icon icon={<CarOutline />} size="xsmall" />{' '}
                      <span>My Orders</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      dataUiTestId="header-logout-button"
                      className="header-account--link"
                      link={{ href: router.pathname, label: 'Log Out' }}
                      as={router.asPath}
                      onClick={() => onLogOut()}
                      replace
                    >
                      <Icon icon={<LogOutOutline />} size="xsmall" />{' '}
                      <span>Log Out</span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Button
              withoutDefaultClass
              className="header-account--toggle"
              fill="clear"
              label={
                <RouterLink link={loginLink} as={loginLink.as}>
                  {!isDesktop ? (
                    <Icon icon={<PersonCircleSharp />} size="xsmall" />
                  ) : (
                    <span>Login / Register</span>
                  )}
                </RouterLink>
              }
            />
          )}
        </div>
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
              <Icon icon={<Menu />} color="darker" />{' '}
              <Icon icon={<Close />} color="darker" />{' '}
            </>
          }
          size="expand"
          color="inherit"
          fill="clear"
        />
      </div>
      <BenefitsBar countItems={5} />
      <ServiceBanner
        enable={serviceBanner?.enable}
        message={serviceBanner?.message}
        link={serviceBanner?.link}
      />
    </header>
  );
});

export default Header;
