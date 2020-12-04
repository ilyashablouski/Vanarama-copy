/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import FlameSharp from '@vanarama/uibook/lib/assets/icons/FlameSharp';
import Button from '@vanarama/uibook/lib/components/atoms/button';
import Image from '@vanarama/uibook/lib/components/atoms/image';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink } from './Header';

export interface IHeaderSecondaryMenuProps extends IBaseProps {
  links: IHeaderLink[];
  title: string;
  onClickTitle: () => void;
  isMobile: boolean;
  isMenuOpen: boolean;
  promotionalImage: any;
}

const HeaderSecondaryMenu: FC<IHeaderSecondaryMenuProps> = memo(props => {
  const router = useRouter();
  const {
    links,
    title,
    onClickTitle,
    isMobile,
    isMenuOpen,
    promotionalImage,
  } = props;
  const firstChildrenLinks = links.find(
    el => !!el.children?.length,
  ) as IHeaderLink;

  const [childrenLinks, setChildrenLinks] = useState<IHeaderLink>(
    firstChildrenLinks,
  );
  const [isOpenMenu, setIsOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    if (firstChildrenLinks?.id) {
      setIsOpenMenu(firstChildrenLinks.id);
    }
  }, [firstChildrenLinks]);

  useEffect(() => {
    setIsOpenMenu(null);
  }, [router, setIsOpenMenu, isMenuOpen]);

  const linkClassName = (classes: {
    title?: boolean;
    open?: boolean;
    highlight?: boolean;
    half?: boolean;
    withChildren?: boolean;
  }) =>
    cx('menu-li', {
      'menu-title': classes.title,
      '-open': classes.open,
      '-highlight': classes.highlight,
      '-span-half': classes.half,
      '-with-children': classes.withChildren,
    });

  return (
    <div
      className="menu-secondary--wrapper-outer"
      data-testid="menu-secondary--wrapper-outer"
    >
      <div className="menu-secondary--wrapper-inner">
        <ul className="menu-secondary">
          <li className={linkClassName({ title: true })}>
            <Button
              withoutDefaultClass
              className="link"
              onClick={el => {
                el.preventDefault();
                onClickTitle();
              }}
              dataTestId="menu-title"
              color="black"
              fill="clear"
              label={title}
            />
          </li>
          {links.map((link: IHeaderLink) => (
            <li
              key={`${link.label}_${title}`}
              className={linkClassName({
                open: !!link.children?.length && isOpenMenu === link.id,
                highlight: link.highlight,
                withChildren: !!link.children?.length,
              })}
              onMouseOver={
                link.children?.length
                  ? () => {
                      setChildrenLinks(link as IHeaderLink);
                      setIsOpenMenu(link.id || null);
                    }
                  : undefined
              }
              onFocus={
                link.children?.length
                  ? () => {
                      setChildrenLinks(link as IHeaderLink);
                      setIsOpenMenu(link.id || null);
                    }
                  : undefined
              }
              data-testid={link.label}
            >
              {!link.href ? (
                <span
                  className={link.highlight ? 'link -white' : 'link -inherit'}
                >
                  {link.highlight && (
                    <Icon icon={<FlameSharp />} color="white" size="xsmall" />
                  )}
                  {link.label}
                </span>
              ) : (
                <RouterLink
                  link={link}
                  classNames={{
                    color: (!!link.highlight && 'white') || 'inherit',
                  }}
                  onClick={
                    isMobile && link.children?.length
                      ? el => {
                          el.preventDefault();
                          setIsOpenMenu(link.id || null);
                        }
                      : undefined
                  }
                >
                  {link.highlight && (
                    <Icon icon={<FlameSharp />} color="white" size="xsmall" />
                  )}
                  <span>{link.label}</span>
                </RouterLink>
              )}
            </li>
          ))}
        </ul>
        {childrenLinks?.children?.length ? (
          <ul
            className={cx('menu-tertiary', {
              '-open': isOpenMenu,
            })}
          >
            <li className={linkClassName({ title: true })}>
              <Button
                withoutDefaultClass
                className="link"
                onClick={el => {
                  el.preventDefault();
                  setIsOpenMenu(null);
                }}
                dataTestId="menu-tertiary-title"
                color="black"
                fill="clear"
                label={childrenLinks.label}
              />
            </li>
            {(childrenLinks.children as IHeaderLink[]).map(
              (linkSecondary: IHeaderLink) => (
                <li
                  key={linkSecondary.label}
                  className={linkClassName({
                    highlight: linkSecondary.highlight,
                    half: childrenLinks?.children!.length > 4,
                  })}
                >
                  <RouterLink link={linkSecondary} as={linkSecondary.as}>
                    <span>{linkSecondary.label}</span>
                  </RouterLink>
                </li>
              ),
            )}
          </ul>
        ) : null}
        <div className="menu-featured">
          <RouterLink link={{ href: promotionalImage?.url, label: '' }}>
            <div className="image -expand">
              <Image
                src={promotionalImage?.image.url || '/img-placeholder.png'}
                alt={promotionalImage?.image.fileName}
              />
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  );
});

export default HeaderSecondaryMenu;
