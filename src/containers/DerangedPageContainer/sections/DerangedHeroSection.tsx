import React, { useMemo } from 'react';
import cx from 'classnames';
import dynamic from 'next/dynamic';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_hero_image as IHeroImage } from '../../../../generated/GenericPageQuery';
import { HeroHeading, HeroTitle } from '../../../components/Hero';
import { useMobile375Viewport } from '../../../hooks/useMediaQuery';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={2} />,
});

interface IProps {
  title: string;
  body: string;
  image: IHeroImage | null;
}

const DerangedHeroSection: React.FC<IProps> = ({ title, body }) => {
  const isMobile375Viewport = useMobile375Viewport();
  const wrapperDynamicClassNames = useMemo(
    () =>
      isMobile375Viewport ? '-justify-content-column' : '-justify-content-row',
    [isMobile375Viewport],
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
                '-mt-200': isMobile375Viewport,
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(DerangedHeroSection);
