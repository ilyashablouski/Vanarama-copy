import React, { FC, memo, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import cx from 'classnames';

import { IBaseProps } from 'core/interfaces/base';

import Skeleton from '../Skeleton';
import RouterLink from '../RouterLink';

import { IHeaderLink, IHeaderPromoImageLink } from './Header';
import Label from './Label';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={4} />,
});
const Button = dynamic(() => import('core/atoms/button'), {
  loading: () => <Skeleton count={1} />,
});

const Icon = dynamic(() => import('core/atoms/icon'), {
  ssr: false,
});
const FlameSharp = dynamic(() => import('core/assets/icons/FlameSharp'), {
  ssr: false,
});

const MIN_PROMO_IMAGES_NUMBER = 1;
const MAX_PROMO_IMAGES_NUMBER = 2;

export interface IHeaderSecondaryMenuProps extends IBaseProps {
  links: IHeaderLink[];
  title: string;
  onClickTitle: () => void;
  isTabletOrMobile: boolean;
  isMenuOpen: boolean;
  isSecondaryMenuOpen: boolean;
  promoImagesLinks?: Array<IHeaderPromoImageLink>;
}

const HeaderSecondaryMenu: FC<IHeaderSecondaryMenuProps> = memo(props => {
  const router = useRouter();
  const {
    links,
    title,
    onClickTitle,
    isTabletOrMobile,
    isSecondaryMenuOpen,
    isMenuOpen,
    promoImagesLinks,
    dataUiTestId,
  } = props;
  const firstChildrenLinks: IHeaderLink | undefined = useMemo(
    () => links.find(el => !!el.children?.length && !el.promoImageLink?.url),
    [links],
  );

  const tertiaryLinks: IHeaderLink[] = useMemo(
    () => links.filter(link => !!link.children?.length),
    [links],
  );

  const [activeTertiaryMenu, setActiveTertiaryMenu] = useState<string | null>(
    firstChildrenLinks?.id || '',
  );

  const promoImagesNumber = promoImagesLinks?.length ?? 0;
  const isMultiplePromoImages = promoImagesNumber > MIN_PROMO_IMAGES_NUMBER;
  const resultPromoImagesLinks = promoImagesLinks?.slice(
    isMultiplePromoImages && activeTertiaryMenu ? MIN_PROMO_IMAGES_NUMBER : 0,
  );

  useEffect(() => {
    if (isTabletOrMobile) {
      setActiveTertiaryMenu(null);
    } else {
      setActiveTertiaryMenu(
        promoImagesNumber < MAX_PROMO_IMAGES_NUMBER
          ? firstChildrenLinks?.id ?? ''
          : null,
      );
    }
  }, [
    router,
    isMenuOpen,
    isSecondaryMenuOpen,
    isTabletOrMobile,
    setActiveTertiaryMenu,
    firstChildrenLinks?.id,
    promoImagesNumber,
  ]);

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
        <ul
          className="menu-secondary"
          data-uitestid={`${dataUiTestId}_menu-secondary`}
        >
          <li
            className={linkClassName({
              title: true,
            })}
          >
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
              data-testid={link.label}
            >
              {!link.href ? (
                <Button
                  withoutDefaultClass
                  className={link.highlight ? 'link -white' : 'link -inherit'}
                  color="black"
                  fill="clear"
                  size="initial-size"
                  label={link.highlightLabel ? link.highlightLabel : link.label}
                  dataUiTestId={`${dataUiTestId}_button_${link.label}`}
                  onClick={
                    isTabletOrMobile && link.children?.length
                      ? () => {
                          setActiveTertiaryMenu(link?.id || '');
                        }
                      : undefined
                  }
                  onMouseOver={
                    !isTabletOrMobile && link.children?.length
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
                >
                  {link.highlight && (
                    <Icon icon={<FlameSharp />} color="white" size="xsmall" />
                  )}
                </Button>
              ) : (
                <RouterLink
                  link={link}
                  classNames={{
                    color: (!!link.highlight && 'white') || 'inherit',
                  }}
                  onClick={
                    isTabletOrMobile && link.children?.length
                      ? el => {
                          el.preventDefault();
                          setActiveTertiaryMenu(link.id || null);
                        }
                      : undefined
                  }
                  onMouseOver={
                    !isTabletOrMobile && link.children?.length
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
                >
                  {link.highlight && (
                    <Icon icon={<FlameSharp />} color="white" size="xsmall" />
                  )}
                  <span>{link.label}</span>
                  {link.highlightLabel && <Label text={link.highlightLabel} />}
                </RouterLink>
              )}
            </li>
          ))}
        </ul>
        {tertiaryLinks.map(tertiaryBlock => {
          const { promoImageLink, children: secondaryLinks } = tertiaryBlock;

          return (
            <React.Fragment key={`menu-tertiary-${tertiaryBlock.id}`}>
              <ul
                className={cx('menu-tertiary', {
                  '-open': activeTertiaryMenu === tertiaryBlock.id,
                })}
                data-uitestid={`${dataUiTestId}_menu-tertiary_${tertiaryBlock.label}`}
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
                {secondaryLinks?.map((secondaryLink: IHeaderLink) => (
                  <li
                    key={secondaryLink.label}
                    className={linkClassName({
                      highlight: secondaryLink.highlight,
                      half: secondaryLinks.length > 4 && title !== 'ELECTRIC',
                    })}
                  >
                    <RouterLink link={secondaryLink} as={secondaryLink.as}>
                      {secondaryLink.highlight && (
                        <Icon
                          icon={<FlameSharp />}
                          color="white"
                          size="xsmall"
                        />
                      )}
                      <span>{secondaryLink.label}</span>
                    </RouterLink>
                  </li>
                ))}
              </ul>
              {promoImageLink?.url && (
                <div
                  key={promoImageLink.url}
                  className={cx('menu-featured', 'tertiary', {
                    '-hide':
                      activeTertiaryMenu !== tertiaryBlock.id &&
                      activeTertiaryMenu !== '',
                  })}
                >
                  <RouterLink
                    link={{
                      href: promoImageLink?.url,
                      label: '',
                    }}
                  >
                    <ImageV2
                      quality={60}
                      width={promoImageLink?.image.width ?? 800}
                      height={promoImageLink?.image.height ?? 800}
                      alt={promoImageLink?.image.fileName}
                      src={promoImageLink?.image.url || '/img-placeholder.png'}
                    />
                  </RouterLink>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {resultPromoImagesLinks?.map(promoImageLink => (
          <div className="menu-featured" key={promoImageLink.url}>
            <RouterLink link={{ href: promoImageLink?.url, label: '' }}>
              <ImageV2
                quality={60}
                width={promoImageLink.image.width ?? 800}
                height={promoImageLink.image.height ?? 800}
                src={promoImageLink?.image.url || '/img-placeholder.png'}
                alt={promoImageLink?.image.fileName}
              />
            </RouterLink>
          </div>
        ))}
      </div>
    </div>
  );
});

export default HeaderSecondaryMenu;
