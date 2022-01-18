import React from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_hero_image as IHeroImage } from '../../../../generated/GenericPageQuery';
import { HeroHeading, HeroTitle } from '../../../components/Hero';
import useMediaQuery, { useMobileViewport } from '../../../hooks/useMediaQuery';
import { derangedImageSrc } from './constants';

const ImageV2 = dynamic(() => import('core/atoms/image/ImageV2'), {
  loading: () => <Skeleton count={2} />,
});

interface IProps {
  title: string;
  body: string;
  image: IHeroImage | null;
}

const DerangedHeroSection: React.FC<IProps> = ({ title, body }) => {
  const isMobileViewport = useMobileViewport();
  const isMobile375Viewport = useMediaQuery('(max-width: 375px)');

  return (
    <>
      <div className="deranged-hero-wrapper">
        <ImageV2
          src={
            isMobile375Viewport
              ? derangedImageSrc.mobile375
              : derangedImageSrc.desktop
          }
          className="deranged-hero-image"
          objectFit="cover"
          lazyLoad={false}
          quality={70}
          plain
        />
      </div>
      <section className="row:bg-hero">
        <div className="row:hero -clear-background row:hero--deranged-content">
          <div className="-deranged-content--wrapper">
            <ImageV2
              width="41"
              height="51"
              src={`${process.env.HOST_DOMAIN}/Assets/images/deranged/deranged-logo.png`}
              alt="Deranged icon"
              quality={60}
              sizes="30vw"
              size="large"
              inline
              plain
            />
            <div>
              <HeroHeading text={title || ''} />
              <HeroTitle
                text={body || ''}
                className={cx('-w-500', {
                  '-mt-200': isMobileViewport,
                })}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default React.memo(DerangedHeroSection);
