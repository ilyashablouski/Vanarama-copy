import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../../components/Skeleton';
import { GenericPageQuery_genericPage_sections_hero_image as IHeroImage } from '../../../../generated/GenericPageQuery';
import { HeroHeading, HeroTitle } from '../../../components/Hero';

const Image = dynamic(() => import('core/atoms/image'), {
  loading: () => <Skeleton count={2} />,
});

interface IProps {
  title: string;
  body: string;
  image: IHeroImage | null;
}

const DerangedHeroSection: React.FC<IProps> = ({ title, body }) => {
  return (
    <section className="row:bg-hero -deranged">
      <div className="row:hero -clear-background row:hero--deranged-content">
        <div className="-justify-content-row">
          <Image
            width="105"
            height="135"
            src="/Assets/images/deranged/deranged-logo.png"
            size="large"
            alt="Deranged icon"
            plain
          />
          <div>
            <HeroHeading text={title || ''} />
            <HeroTitle text={body || ''} className="-w-500"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(DerangedHeroSection);
