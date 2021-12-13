import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

import SchemaJSON from 'core/atoms/schema-json';

import {
  vehicleList as IVehicleList,
  vehicleList_vehicleList_edges as IVehicle,
} from '../../../generated/vehicleList';
import {
  GetProductCard as IProductCardList,
  GetProductCard_productCard as IProductCard,
} from '../../../generated/GetProductCard';
import { GenericPageQuery_genericPage as IGenericPage } from '../../../generated/GenericPageQuery';
import { Nullable } from '../../types/common';

import Head from '../../components/Head';
import Skeleton from '../../components/Skeleton';
import LevcHeroBanner from './components/LevcHeroBanner';

const LevcVehicleList = dynamic(() => import('./components/LevcVehicleList'), {
  loading: () => <Skeleton count={1} />,
});
const WhyLeaseWithVanaramaTiles = dynamic(
  () => import('../../components/WhyLeaseWithVanaramaTiles'),
  { loading: () => <Skeleton count={1} /> },
);
const RelatedCarousel = dynamic(
  () => import('../../components/RelatedCarousel'),
  { loading: () => <Skeleton count={1} /> },
);

// TODO: Remove when we get this data from CMS
const accentColor = '#FFEC00';
const accentTextColor = '#000000';

interface ILevcPageContainer {
  vehiclesData: Nullable<IVehicleList>;
  productCardsData: Nullable<IProductCardList>;
  genericPage: IGenericPage;
}

const LevcPageContainer: React.FC<ILevcPageContainer> = ({
  genericPage,
  vehiclesData,
  productCardsData,
}) => {
  const { metaData } = genericPage;
  const { tiles, carousel } = genericPage.sections ?? {};

  const vehicleList = useMemo(
    () =>
      vehiclesData?.vehicleList.edges &&
      (vehiclesData.vehicleList.edges.filter(Boolean) as IVehicle[]),
    [vehiclesData],
  );
  const productCardList = useMemo(
    () =>
      productCardsData?.productCard &&
      (productCardsData.productCard.filter(Boolean) as IProductCard[]),
    [productCardsData],
  );

  return (
    <>
      <LevcHeroBanner />
      {productCardList?.length && vehicleList?.length ? (
        <LevcVehicleList
          accentColor={accentColor}
          accentTextColor={accentTextColor}
          productCardList={productCardList}
          vehicleList={vehicleList}
        />
      ) : null}
      {tiles?.tiles && (
        <WhyLeaseWithVanaramaTiles
          title={tiles.tilesTitle}
          tiles={tiles.tiles}
        />
      )}
      {carousel && (
        <RelatedCarousel cards={carousel.cards} title={carousel.title} />
      )}
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={null} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export default LevcPageContainer;
