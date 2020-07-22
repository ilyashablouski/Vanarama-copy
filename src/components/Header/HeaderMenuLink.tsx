/* eslint-disable import/no-cycle */
import React, { FC, memo } from 'react';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink } from './Header';
import HeaderSecondaryMenu from './HeaderSecondaryMenu';
import { useHover } from '../../hooks/useHover';

export interface IHeaderMenuLinkProps extends IBaseProps {
  link: IHeaderLink;
}

const HeaderMenuLink: FC<IHeaderMenuLinkProps> = memo(props => {
  const { link } = props;

  const [hoverRef, isHovered] = useHover<HTMLLIElement>();

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

  return (
    <li
      key={link.label}
      className={linkClassName({
        open: !!link.children?.length && isHovered,
        highlight: link.highlight,
      })}
      ref={(!!link.children?.length && hoverRef) || null}
    >
      <RouterLink link={link}>
        {/* {link.highlight && (
          <Icon name="FlameSharp" color="orange" size="xsmall" />
        )} */}
        {link.label}
      </RouterLink>
      {!!link.children?.length && (
        <HeaderSecondaryMenu
          key={link.label}
          childrenLinks={link.children}
          title={link.label}
        />
      )}
    </li>
  );
});

export default HeaderMenuLink;
