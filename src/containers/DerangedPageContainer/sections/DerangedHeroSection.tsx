import React from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_hero_image as IHeroImage } from '../../../../generated/GenericPageQuery';
import { HeroHeading, HeroTitle } from '../../../components/Hero';
import { useMobileViewport } from '../../../hooks/useMediaQuery';

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

  return (
    <section className="row:bg-hero -deranged">
      <div className="row:hero -clear-background row:hero--deranged-content">
        <div className="-deranged-content--wrapper">
          <ImageV2
            width="41"
            height="51"
            src={`${process.env.HOST_DOMAIN}/Assets/images/deranged/deranged-logo.png`}
            alt="Deranged icon"
            lazyLoad={false}
            size="large"
            quality={60}
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
  );
};

export default React.memo(DerangedHeroSection);
