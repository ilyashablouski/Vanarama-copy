import React from 'react';
import Loading from '@vanarama/uibook/lib/components/atoms/loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useGenericPage } from '../../gql/genericPage';
import PageNotFoundContainer from '../../containers/PageNotFoundContainer/PageNotFoundContainer';
import { getSectionsData } from '../../utils/getSectionsData';

const PageNotFound = () => {
  const { data, loading, error } = useGenericPage('404');

  if (loading) {
    return <Loading size="large" />;
  }

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  const name = getSectionsData(['metaData', 'name'], data?.genericPage);
  const cards = getSectionsData(
    ['sections', 'cards', 'cards'],
    data?.genericPage,
  );
  const featured = getSectionsData(['sections', 'featured'], data?.genericPage);

  return (
    <PageNotFoundContainer featured={featured} name={name} cards={cards} />
  );
};

export default PageNotFound;
