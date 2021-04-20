/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';
import { IBaseProps } from 'core/interfaces/base';
import { LinkTypes } from '../../models/enum/LinkTypes';
import { IClassNamesProps } from '../../models/IClassNamesProps';
import { ILinkProps } from './interface';
import setRel from '../../utils/setRel';

interface IAppLinkProps extends IBaseProps {
  link: ILinkProps;
  replace?: boolean;
  onClick?(e: React.MouseEvent): void;
  className?: string;
  classNames?: IClassNamesProps;
  as?: string | UrlObject | undefined;
  dataMenu?: string;
  withoutDefaultClassName?: boolean;
  withoutLink?: boolean;
  onMouseOver?: React.MouseEventHandler<HTMLAnchorElement>;
  onFocus?: React.FocusEventHandler<HTMLAnchorElement>;
}

const RouterLink: React.FC<IAppLinkProps> = props => {
  const {
    link,
    className,
    children,
    replace,
    onClick,
    classNames,
    dataTestId,
    dataMenu,
    as,
    withoutDefaultClassName,
    withoutLink,
    onMouseOver,
    onFocus,
  } = props;
  const router = useRouter();
  const linkClassName = cx(className, {
    // eslint-disable-next-line prettier/prettier
    link: !withoutDefaultClassName,
    [`-${classNames?.color}`]: classNames?.color,
    [`-${classNames?.size}`]: classNames?.size,
    [`-${classNames?.position}`]: classNames?.position,
    '-plain': classNames?.plain,
    '-solid': classNames?.solid,
    '-clear': classNames?.clear,
    'InfinityNumber clickable': link.href?.includes('tel:'),
  });

  if (withoutLink || link.href === '') {
    return (
      <span
        className={linkClassName}
        onClick={e => onClick && onClick(e)}
        data-testid={dataTestId ?? 'withoutLink'}
      >
        {children || link.label}
      </span>
    );
  }

  if (
    link.linkType === LinkTypes.external ||
    !!link.target ||
    link.href.match(/^(https?:)?\/\//) ||
    link.href.match(/.html/)
  ) {
    // Prepend slash to internal links if not already.
    if (!link.href.match(/^(mailto:|tel:|https:|http:|\/)/)) {
      link.href = `/${link.href}`;
    }

    return (
      <a
        href={link.href}
        className={linkClassName}
        target={link.target}
        rel={setRel(link)}
        onClick={e => onClick && onClick(e)}
        data-testid={dataTestId ?? 'link'}
      >
        {children || link.label}
      </a>
    );
  }

  const replaceSpaceInHref =
    link.href.charAt(0) === ' ' ? link.href.replace(' ', '') : link.href;

  const href =
    replaceSpaceInHref?.charAt(0) !== '/'
      ? `/${replaceSpaceInHref}`
      : replaceSpaceInHref;

  return (
    <Link
      href={{
        pathname: link.href ? href : router.asPath,
        query: link.query || {},
      }}
      replace={replace}
      as={as}
      shallow={!!as}
    >
      <a
        className={linkClassName}
        onClick={e => onClick && onClick(e)}
        data-testid={dataTestId ?? 'router-link'}
        data-menu={dataMenu ?? null}
        onMouseOver={e => onMouseOver && onMouseOver(e)}
        onFocus={e => onFocus && onFocus(e)}
      >
        {children || link.label}
      </a>
    </Link>
  );
};

export default RouterLink;
