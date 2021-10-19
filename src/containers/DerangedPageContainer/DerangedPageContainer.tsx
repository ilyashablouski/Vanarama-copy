import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import FeaturedSection from '../../components/FeaturedSection';

const DerangedHeroSection = dynamic(
  () => import('./sections/DerangedHeroSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IDerangedPageContainer {
  data: GenericPageQuery;
}

const DerangedPageContainer: React.FC<IDerangedPageContainer> = ({ data }) => {
  const { hero, featured1, featured2, featured3, featured4 } =
    data.genericPage.sections || {};
  return (
    <>
      {hero && (
        <DerangedHeroSection
          title={hero.title || ''}
          body={hero.body || ''}
          image={hero.image}
        />
      )}
      {featured1 && <FeaturedSection featured={featured1} />}
      {featured2 && <FeaturedSection featured={featured2} />}
      {featured3 && <FeaturedSection featured={featured3} />}
      {featured4 && <FeaturedSection featured={featured4} />}
    </>
  );
};

export default DerangedPageContainer;
