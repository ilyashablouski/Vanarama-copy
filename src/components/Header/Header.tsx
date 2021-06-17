/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable import/no-cycle */
import Cookies from 'js-cookie';
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
  addHeapUserIdentity,
  addHeapUserProperties,
} from '../../utils/addHeapProperties';
import { isWishlistEnabled } from '../../utils/wishlistHelpers';
import {
  GetPerson_getPerson as Person,
  GetPerson,
} from '../../../generated/GetPerson';
import useMount from '../../hooks/useMount';
import useMediaQuery from '../../hooks/useMediaQuery';
import PhoneNumber from '../PhoneNumber/PhoneNumber';
import GlobalSearchContainer from '../../containers/GlobalSearchContainer';
import HeaderWishlistLink from './HeaderWishlistLink';

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
  promotionalImages?: Array<IHeaderPromoImage>;
}

export interface IHeaderProps extends IBaseProps {
  topBarLinks: IHeaderLink[];
  loginLink: ILinkProps & { as?: string };
  phoneNumberLink: ILinkProps;
  customHomePath?: string;
  onLogOut: () => void;
}

export const Header: FC<IHeaderProps> = memo(props => {
  const router = useRouter();
  const {
    className,
    topBarLinks,
    loginLink,
    phoneNumberLink,
    customHomePath,
    onLogOut,
  } = props;
  const [person, setPerson] = useState<Person | null>(null);
  const [ordersLength, setOrdersLength] = useState<number | null>(null);
  const [quotesLength, setQuotesLength] = useState<number | null>(null);
  const [isMenuOpen, setOpenMenu] = useState(false);
  const [isMyAccountOpen, setOpenMyAccount] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1216px)');

  const didMount = useMount();

  useEffect(() => {
    if (!person) {
      localForage.getItem<GetPerson>('person').then(value => {
        if (value) {
          setPerson(value.getPerson);
        }
      });
    }
    if (person) {
      addHeapUserIdentity(person.emailAddresses[0].value);
      addHeapUserProperties({
        uuid: person.uuid,
        bcuid: Cookies.get('BCSessionID') || 'undefined',
      });
    }
    if (!ordersLength) {
      localForage.getItem<number>('ordersLength').then(value => {
        if (value) {
          setOrdersLength(value);
        }
      });
    }
    if (!quotesLength) {
      localForage.getItem<number>('quotesLength').then(value => {
        if (value) {
          setQuotesLength(value);
        }
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
      <div
        className={cx('header-content', {
          '-with-wishlist': didMount && isWishlistEnabled,
        })}
      >
        <RouterLink
          link={{ href: customHomePath || '/', label: '' }}
          classNames={{ color: 'orange', plain: true }}
          className="logo header-logo"
        >
          <Logo asset="vanarama" />
        </RouterLink>{' '}
        <GlobalSearchContainer />
        <PhoneNumber phoneNumberLink={phoneNumberLink} withIcon />{' '}
        {isWishlistEnabled && <HeaderWishlistLink />}
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
                      <Icon icon={<ReceiptOutline />} size="xsmall" />{' '}
                      <span>My Quotes</span>
                    </RouterLink>
                  </li>
                  <li>
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
                      <Icon icon={<CarOutline />} size="xsmall" />{' '}
                      <span>My Orders</span>
                    </RouterLink>
                  </li>
                  <li>
                    <RouterLink
                      className="header-account--link"
                      link={{ href: router.pathname, label: 'Log Out' }}
                      as={router.asPath}
                      onClick={async () => {
                        setPerson(null);
                        await onLogOut();
                      }}
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
              <Icon icon={<Menu />} color="darker" />{' '}
              <Icon icon={<Close />} color="darker" />{' '}
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
