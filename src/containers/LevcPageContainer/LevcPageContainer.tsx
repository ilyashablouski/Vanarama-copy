import React from 'react';
import dynamic from 'next/dynamic';

import SchemaJSON from 'core/atoms/schema-json';

import { GenericPageQuery_genericPage as IGenericPage } from '../../../generated/GenericPageQuery';

import Head from '../../components/Head';
import Skeleton from '../../components/Skeleton';

const WhyLeaseWithVanaramaTiles = dynamic(
  () => import('../../components/WhyLeaseWithVanaramaTiles'),
  { loading: () => <Skeleton count={1} /> },
);
const RelatedCarousel = dynamic(
  () => import('../../components/RelatedCarousel'),
  { loading: () => <Skeleton count={1} /> },
);

interface ILevcPageContainer {
  genericPage: IGenericPage;
}

const LevcPageContainer: React.FC<ILevcPageContainer> = ({ genericPage }) => {
  const { metaData } = genericPage;
  const { tiles, carousel } = genericPage.sections || {};

  return (
    <>
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
