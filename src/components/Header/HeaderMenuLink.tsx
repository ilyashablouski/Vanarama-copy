/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { IBaseProps } from 'core/interfaces/base';
import { useMediaQuery } from 'react-responsive';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink } from './Header';
import { useHover } from '../../hooks/useHover';

const HeaderSecondaryMenu = dynamic(() => import('./HeaderSecondaryMenu'));
const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const FlameSharp = dynamic(() => import('core/assets/icons/FlameSharp'), {
  ssr: false,
});

export interface IHeaderMenuLinkProps extends IBaseProps {
  link: IHeaderLink;
  isMenuOpen: boolean;
}

const HeaderMenuLink: FC<IHeaderMenuLinkProps> = memo(props => {
  const router = useRouter();
  const { link, isMenuOpen } = props;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1215px)' });

  const [hoverRef, isHovered, resetHover] = useHover<HTMLLIElement>();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

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

  const isSecondaryMenuOpen =
    !!link.children?.length &&
    ((!isTabletOrMobile && isHovered) || (isTabletOrMobile && isOpenMenu));

  useEffect(() => {
    setIsOpenMenu(false);
    if (isHovered) {
      resetHover();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, setIsOpenMenu, isMenuOpen]);

  return (
    <li
      className={linkClassName({
        open: isSecondaryMenuOpen,
        highlight: link.highlight,
      })}
      ref={(!!link.children?.length && hoverRef) || null}
    >
      <RouterLink
        link={link}
        dataUiTestId={`header-${link.label}-link`}
        onClick={
          isTabletOrMobile && link.children?.length
            ? el => {
                el.preventDefault();
                setIsOpenMenu(true);
              }
            : undefined
        }
      >
        {link.highlight && (
          <Icon
            icon={<FlameSharp />}
            color={isTabletOrMobile ? 'white' : 'orange'}
            size="xsmall"
          />
        )}
        <span>{link.label}</span>
      </RouterLink>
      {link.children?.length ? (
        <HeaderSecondaryMenu
          isMenuOpen={isMenuOpen}
          isSecondaryMenuOpen={isSecondaryMenuOpen}
          onClickTitle={() => setIsOpenMenu(false)}
          promoImagesLinks={link.promoImagesLinks}
          links={link.children as IHeaderLink[]}
          isTabletOrMobile={isTabletOrMobile}
          title={link.label}
          dataUiTestId={`header_secondary-menu_${link.label}`}
        />
      ) : null}
    </li>
  );
});

export default HeaderMenuLink;
