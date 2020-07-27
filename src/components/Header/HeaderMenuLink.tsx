/* eslint-disable import/no-cycle */
import React, { FC, memo, useState } from 'react';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import FlameSharp from '@vanarama/uibook/lib/assets/icons/FlameSharp';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink } from './Header';
import HeaderSecondaryMenu from './HeaderSecondaryMenu';
import { useHover } from '../../hooks/useHover';
import { useMobileViewport } from '../../hooks/useMediaQuery';

export interface IHeaderMenuLinkProps extends IBaseProps {
  link: IHeaderLink;
}

const HeaderMenuLink: FC<IHeaderMenuLinkProps> = memo(props => {
  const { link } = props;

  const isMobile = useMobileViewport();
  const [hoverRef, isHovered] = useHover<HTMLLIElement>();

  const [idOpenMenu, setIdOpenMenu] = useState(false);

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
    ((!isMobile && isHovered) || (isMobile && idOpenMenu));

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
          isMobile
            ? el => {
                el.preventDefault();
                setIdOpenMenu(true);
              }
            : undefined
        }
        replace
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
          links={link.children as IHeaderLink[]}
          title={link.label}
          onClickTitle={() => setIdOpenMenu(false)}
          isMobile={isMobile}
        />
      )}
    </li>
  );
});

export default HeaderMenuLink;
