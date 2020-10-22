import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading/Loading';
import { useRouter } from 'next/router';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGenericPage } from '../../gql/genericPage';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { getSectionsData } from '../../utils/getSectionsData';

const PageNotFound = () => {
  const router = useRouter();
  const { data, loading, error } = useGenericPage(router.asPath.slice(1));

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);

  return (
    <PageNotFoundContainer
      featured={featured}
      name={name}
      cards={cards}
      metaData={metaData}
    />
  );
};

export default PageNotFound;
