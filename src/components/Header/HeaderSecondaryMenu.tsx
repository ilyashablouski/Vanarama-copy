/* eslint-disable import/no-cycle */
import React, { FC, memo, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import cx from 'classnames';
import { IBaseProps } from '@vanarama/uibook/lib/interfaces/base';
import RouterLink from '../RouterLink/RouterLink';
import { IHeaderLink, IHeaderPromoImage } from './Header';
import Skeleton from '../Skeleton';

const Image = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/image'),
  {
    loading: () => <Skeleton count={4} />,
  },
);
const Button = dynamic(
  () => import('@vanarama/uibook/lib/components/atoms/button'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

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

export interface IHeaderSecondaryMenuProps extends IBaseProps {
  links: IHeaderLink[];
  title: string;
  onClickTitle: () => void;
  isMobile: boolean;
  isMenuOpen: boolean;
  promotionalImage?: IHeaderPromoImage;
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
  const firstChildrenLinks: IHeaderLink | undefined = useMemo(
    () => links.find(el => !!el.children?.length),
    [links],
  );

  const tertiaryLinks: IHeaderLink[] = useMemo(
    () => links.filter(link => !!link.children?.length),
    [links],
  );

  const [activeTertiaryMenu, setActiveTertiaryMenu] = useState<string | null>(
    firstChildrenLinks?.id || '',
  );

  useEffect(() => {
    if (isMobile) {
      setActiveTertiaryMenu(null);
    }
  }, [router, setActiveTertiaryMenu, isMenuOpen, isMobile]);

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
                open: !!link.children?.length && activeTertiaryMenu === link.id,
                highlight: link.highlight,
                withChildren: !!link.children?.length,
              })}
              onMouseOver={
                link.children?.length
                  ? () => {
                      setActiveTertiaryMenu(link?.id || '');
                    }
                  : undefined
              }
              onFocus={
                link.children?.length
                  ? () => {
                      setActiveTertiaryMenu(link?.id || '');
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
                          setActiveTertiaryMenu(link.id || null);
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
        {tertiaryLinks.map(tertiaryBlock => (
          <ul
            key={`menu-tertiary-${tertiaryBlock?.id}`}
            className={cx('menu-tertiary', {
              '-open': activeTertiaryMenu === tertiaryBlock.id,
            })}
          >
            <li className={linkClassName({ title: true })}>
              <Button
                withoutDefaultClass
                className="link"
                onClick={el => {
                  el.preventDefault();
                  setActiveTertiaryMenu(null);
                }}
                dataTestId={`menu-tertiary-${tertiaryBlock.id}`}
                color="black"
                fill="clear"
                label={tertiaryBlock.label}
              />
            </li>
            {(tertiaryBlock.children as IHeaderLink[]).map(
              (linkSecondary: IHeaderLink) => (
                <li
                  key={linkSecondary.label}
                  className={linkClassName({
                    highlight: linkSecondary.highlight,
                    half: tertiaryBlock?.children!.length > 4,
                  })}
                >
                  <RouterLink link={linkSecondary} as={linkSecondary.as}>
                    <span>{linkSecondary.label}</span>
                  </RouterLink>
                </li>
              ),
            )}
          </ul>
        ))}

        {promotionalImage?.url && (
          <div className="menu-featured">
            <RouterLink link={{ href: promotionalImage?.url, label: '' }}>
              <Image
                src={promotionalImage?.image.url || '/img-placeholder.png'}
                alt={promotionalImage?.image.fileName}
              />
            </RouterLink>
          </div>
        )}
      </div>
    </div>
  );
});

export default HeaderSecondaryMenu;
