/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { UrlObject } from 'url';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import { LinkTypes } from '../../models/enum/LinkTypes';
import { IClassNamesProps } from '../../models/IClassNamesProps';
import { ILinkProps } from './interface';

interface IAppLinkProps extends IBaseProps {
  link: ILinkProps;
  replace?: boolean;
  onClick?(e: React.MouseEvent): void;
  className?: string;
  classNames?: IClassNamesProps;
  as?: string | UrlObject | undefined;
  dataMenu?: string;
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
  } = props;

  const linkClassName = cx('link', className, {
    [`-${classNames?.color}`]: classNames?.color,
    [`-${classNames?.size}`]: classNames?.size,
    [`-${classNames?.position}`]: classNames?.position,
    '-plain': classNames?.plain,
    '-solid': classNames?.solid,
  });

  if (link.linkType === LinkTypes.external || !!link.target) {
    return (
      <a
        href={link.href}
        className={linkClassName}
        target={link.target}
        rel="noopener noreferrer"
        onClick={e => onClick && onClick(e)}
        data-testid="link"
      >
        {children || link.label}
      </a>
    );
  }

  return (
    <Link
      href={{ pathname: link.href, query: link.query || {} }}
      replace={replace}
      as={as}
      shallow={!!as}
    >
      <a
        className={linkClassName}
        onClick={e => onClick && onClick(e)}
        data-testid={dataTestId ?? 'router-link'}
        data-menu={dataMenu ?? null}
      >
        {children || link.label}
      </a>
    </Link>
  );
};

export default RouterLink;
