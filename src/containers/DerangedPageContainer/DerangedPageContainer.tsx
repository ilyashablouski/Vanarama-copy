import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

const DerangedHeroSection = dynamic(
  () => import('./sections/DerangedHeroSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const DerangedTilesSection = dynamic(
  () => import('./sections/DerangedTilesSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const DerangedLeagueSection = dynamic(
  () => import('./sections/DerangedLeagueSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IDerangedPageContainer {
  data: GenericPageQuery;
}

const DerangedPageContainer: FC<IDerangedPageContainer> = ({ data }) => {
  return (
    <>
      {data.genericPage.sections?.hero && (
        <DerangedHeroSection {...data.genericPage.sections.hero} />
      )}
      {data.genericPage.sections?.tiles && (
        <DerangedTilesSection {...data.genericPage.sections.tiles} />
      )}
      <DerangedLeagueSection />
    </>
  );
};

export default DerangedPageContainer;
