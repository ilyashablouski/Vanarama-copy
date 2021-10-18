import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import WhyLeaseWithVanaramaTiles from '../../components/WhyLeaseWithVanaramaTiles';
import NationalLeagueBanner from '../../components/NationalLeagueBanner';

const DerangedHeroSection = dynamic(
  () => import('./sections/DerangedHeroSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IDerangedPageContainer {
  data: GenericPageQuery;
}

const DerangedPageContainer: FC<IDerangedPageContainer> = ({ data }) => {
  const { hero, tiles } = data.genericPage.sections || {};
  return (
    <>
      {hero && (
        <DerangedHeroSection
          title={hero.title || ''}
          body={hero.body || ''}
          image={hero.image}
        />
      )}
      {tiles && (
        <WhyLeaseWithVanaramaTiles
          title={tiles.tilesTitle || ''}
          tiles={tiles.tiles || []}
        />
      )}
      <NationalLeagueBanner />
    </>
  );
};

export default DerangedPageContainer;
