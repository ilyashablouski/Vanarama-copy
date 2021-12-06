import React, { useMemo } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_hero_image as IHeroImage } from '../../../../generated/GenericPageQuery';
import { HeroHeading, HeroTitle } from '../../../components/Hero';
import { useMobileViewport } from '../../../hooks/useMediaQuery';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={2} />,
});

interface IProps {
  title: string;
  body: string;
  image: IHeroImage | null;
}

const DerangedHeroSection: React.FC<IProps> = ({ title, body }) => {
  const isMobileViewport = useMobileViewport();
  const wrapperDynamicClassNames = useMemo(
    () =>
      isMobileViewport ? '-justify-content-column' : '-justify-content-row',
    [isMobileViewport],
  );

  return (
    <section className="row:bg-hero -deranged">
      <div className="row:hero -clear-background row:hero--deranged-content">
        <div className={wrapperDynamicClassNames}>
          <Image
            src="/Assets/images/deranged/deranged-logo.png"
            size="large"
            alt="Deranged icon"
            plain
            inline
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
