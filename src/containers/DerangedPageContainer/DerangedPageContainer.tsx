import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { GetConversionsVehicleList } from '../../../generated/GetConversionsVehicleList';

const DerangedHeroSection = dynamic(
  () => import('./sections/DerangedHeroSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const DerangedVehicleSection = dynamic(
  () => import('./sections/DerangedVehicleSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const FeaturedSection = dynamic(
  () => import('../../components/FeaturedSection'),
  {
    loading: () => <Skeleton count={4} />,
  },
);

interface IDerangedPageContainer {
  pageData: GenericPageQuery;
  derangedVehicleList: GetConversionsVehicleList;
}

const DerangedPageContainer: React.FC<IDerangedPageContainer> = ({
  pageData,
  derangedVehicleList,
}) => {
  const { hero, featured1, featured2, featured3, featured4 } =
    pageData.genericPage.sections || {};
  const { conversions } = derangedVehicleList || {};
  return (
    <>
      {hero && (
        <DerangedHeroSection
          title={hero.title || ''}
          body={hero.body || ''}
          image={hero.image}
        />
      )}
      {conversions && conversions.length > 0 && (
        <DerangedVehicleSection vehicleList={conversions} />
      )}
      {featured1 && <FeaturedSection featured={featured1} />}
      {featured2 && <FeaturedSection featured={featured2} />}
      {featured3 && <FeaturedSection featured={featured3} />}
      {featured4 && <FeaturedSection featured={featured4} />}
    </>
  );
};

export default DerangedPageContainer;
