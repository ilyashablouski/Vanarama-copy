/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import Icon from '@vanarama/uibook/lib/components/atoms/icon';
import FlameSharp from '@vanarama/uibook/lib/assets/icons/FlameSharp';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink } from './Header';

export interface IHeaderSecondaryMenuProps extends IBaseProps {
  links: IHeaderLink[];
  title: string;
  onClickTitle: () => void;
  isMobile: boolean;
  isMenuOpen: boolean;
}

const HeaderSecondaryMenu: FC<IHeaderSecondaryMenuProps> = memo(props => {
  const router = useRouter();
  const { links, title, onClickTitle, isMobile, isMenuOpen } = props;
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
            <RouterLink
              link={{ label: '', href: '' }}
              onClick={() => onClickTitle()}
              dataTestId="menu-title"
            >
              <span>{title}</span>
            </RouterLink>
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
              <RouterLink
                link={{ label: '', href: '' }}
                onClick={el => {
                  el.preventDefault();
                  setIsOpenMenu(null);
                }}
              >
                <span>{childrenLinks.label}</span>
              </RouterLink>
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
          <div className="image -expand">
            <img
              className="image--native"
              src="https://ellisdonovan.s3.eu-west-2.amazonaws.com/custom+%E2%80%93+1.png"
              alt="native"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default HeaderSecondaryMenu;
