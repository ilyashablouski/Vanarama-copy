import React, { FC } from 'react';
import dynamic from 'next/dynamic';
import Skeleton from '../../components/Skeleton';
import { GenericPageQuery } from '../../../generated/GenericPageQuery';
import { GetConversionsCarList } from '../../../generated/GetConversionsCarList';

const DerangedHeroSection = dynamic(
  () => import('./sections/DerangedHeroSection'),
  {
    loading: () => <Skeleton count={1} />,
  },
);

interface IDerangedPageContainer {
  pageData: GenericPageQuery;
  derangedCarList: GetConversionsCarList;
}

const DerangedPageContainer: FC<IDerangedPageContainer> = ({ pageData }) => {
  return (
    <>
      {pageData.genericPage.sections?.hero && (
        <DerangedHeroSection {...pageData.genericPage.sections.hero} />
      )}
    </>
  );
};

export default DerangedPageContainer;
