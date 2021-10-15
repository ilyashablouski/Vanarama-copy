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

interface IDerangedPageContainer {
  data: GenericPageQuery;
}

function DerangedPageContainer({ data }: IDerangedPageContainer) {
  return (
    <>
      {data?.genericPage?.sections?.hero && (
        <DerangedHeroSection {...data.genericPage?.sections?.hero} />
      )}
    </>
  );
}

export default DerangedPageContainer;
