import React, { FC } from 'react';
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

interface IDerangedPageContainer {
  pageData: GenericPageQuery;
  derangedVehicleList: GetConversionsVehicleList;
}

const DerangedPageContainer: FC<IDerangedPageContainer> = ({
  pageData,
  derangedVehicleList,
}) => {
  const { hero } = pageData.genericPage.sections || {};
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
    </>
  );
};

export default DerangedPageContainer;
