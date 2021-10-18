import React from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';

const DerangedHeroSection = dynamic(
  () => import('./sections/DerangedHeroSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

const DerangedFeatureSection = dynamic(
  () => import('./sections/DerangedFeatureSection'),
  {
    loading: () => <Skeleton count={4} />,
  },
);

interface IDerangedPageContainer {
  data: GenericPageQuery;
}

const DerangedPageContainer: React.FC<IDerangedPageContainer> = ({ data }) => {
  return (
    <>
      {data.genericPage.sections?.hero && (
        <DerangedHeroSection {...data.genericPage.sections.hero} />
      )}
      {data.genericPage.sections?.featured1 && (
        <DerangedFeatureSection
          featureNumber="1"
          sectionData={data.genericPage.sections}
        />
      )}
      {data.genericPage.sections?.featured2 && (
        <DerangedFeatureSection
          featureNumber="2"
          sectionData={data.genericPage.sections}
        />
      )}
      {data.genericPage.sections?.featured3 && (
        <DerangedFeatureSection
          featureNumber="3"
          sectionData={data.genericPage.sections}
        />
      )}
      {data.genericPage.sections?.featured4 && (
        <DerangedFeatureSection
          featureNumber="4"
          sectionData={data.genericPage.sections}
        />
      )}
    </>
  );
};

export default DerangedPageContainer;
