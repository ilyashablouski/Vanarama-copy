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
import { removeUrlQueryPart } from '../../utils/url';

interface IAppLinkProps extends IBaseProps {
  link: ILinkProps;
  prefetch?: boolean;
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
  customBackground?: string;
  withoutSilentReplacements?: boolean;
  style?: React.CSSProperties;
}

const RouterLink: React.FC<IAppLinkProps> = props => {
  const {
    link,
    className,
    children,
    replace,
    prefetch,
    onClick,
    classNames,
    dataTestId,
    dataUiTestId,
    dataMenu,
    as,
    withoutDefaultClassName,
    withoutLink,
    onMouseOver,
    onFocus,
    withoutSilentReplacements,
    style,
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
    'InfinityNumber call-us visible-xs': link.href?.includes('tel:'),
  });

  if (withoutLink || link.href === '') {
    return (
      <span
        style={style}
        className={linkClassName}
        onClick={event => onClick && onClick(event)}
        data-testid={dataTestId ?? 'withoutLink'}
        data-uitestid={dataUiTestId}
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

    const isTel = link.href.match(/^tel:/);
    const telProps = {
      'data-ict-discovery-number': link.label,
      'data-ict-silent-replacements': withoutSilentReplacements
        ? undefined
        : true,
    };

    return (
      <a
        style={style}
        className={linkClassName}
        href={link.href}
        target={link.target}
        rel={setRel(link)}
        onClick={event => onClick && onClick(event)}
        data-testid={dataTestId ?? 'link'}
        data-uitestid={dataUiTestId}
        {...(isTel && telProps)}
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

  const urlWithoutQueryString = removeUrlQueryPart(href);
  const queryString = href.split('?')[1];

  return (
    <Link
      href={{
        pathname: link.href ? urlWithoutQueryString : router.asPath,
        query: link.query || queryString || {},
      }}
      prefetch={prefetch}
      replace={replace}
      as={as}
      shallow={!!as}
    >
      <a
        style={style}
        className={linkClassName}
        onClick={event => onClick && onClick(event)}
        data-testid={dataTestId ?? 'router-link'}
        data-uitestid={dataUiTestId}
        data-menu={dataMenu ?? null}
        onMouseOver={event => onMouseOver && onMouseOver(event)}
        onFocus={event => onFocus && onFocus(event)}
      >
        {children || link.label}
      </a>
    </Link>
  );
};

export default RouterLink;
