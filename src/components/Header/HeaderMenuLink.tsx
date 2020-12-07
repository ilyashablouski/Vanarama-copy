/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink } from './Header';
import HeaderSecondaryMenu from './HeaderSecondaryMenu';
import { useHover } from '../../hooks/useHover';
import { useMobileViewport } from '../../hooks/useMediaQuery';

const Icon = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/icon'),
  {
    ssr: false,
  },
);
const FlameSharp = dynamic(
  () => import('@vanarama/uibook/lib/assets/icons/FlameSharp'),
  {
    ssr: false,
  },
);

export interface IHeaderMenuLinkProps extends IBaseProps {
  link: IHeaderLink;
  isMenuOpen: boolean;
}

const HeaderMenuLink: FC<IHeaderMenuLinkProps> = memo(props => {
  const router = useRouter();
  const { link, isMenuOpen } = props;

  const isMobile = useMobileViewport();
  const [hoverRef, isHovered] = useHover<HTMLLIElement>();

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

  const isOpen =
    !!link.children?.length &&
    ((!isMobile && isHovered) || (isMobile && isOpenMenu));

  useEffect(() => {
    setIsOpenMenu(false);
  }, [router, setIsOpenMenu, isMenuOpen]);

  return (
    <li
      key={link.id}
      className={linkClassName({
        open: isOpen,
        highlight: link.highlight,
      })}
      ref={(!!link.children?.length && hoverRef) || null}
    >
      <RouterLink
        key={link.id}
        link={link}
        onClick={
          isMobile && link.children?.length
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
            color={isMobile ? 'white' : 'orange'}
            size="xsmall"
          />
        )}
        <span>{link.label}</span>
      </RouterLink>
      {!!link.children?.length && (
        <HeaderSecondaryMenu
          key={link.label}
          promotionalImage={link.promotionalImage}
          links={link.children as IHeaderLink[]}
          title={link.label}
          onClickTitle={() => setIsOpenMenu(false)}
          isMobile={isMobile}
          isMenuOpen={isMenuOpen}
        />
      )}
    </li>
  );
});

export default HeaderMenuLink;
