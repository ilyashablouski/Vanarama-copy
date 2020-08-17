import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../../hocs/withApollo';
import SearchPageContainer from '../../../containers/SearchPageContainer';
import Head from '../../../components/Head/Head';
import { useGenericPageHead } from '../../../gql/genericPage';

interface IProps {
  isServer: boolean;
}

const Page: NextPage<IProps> = ({ isServer }) => {
  const { data } = useGenericPageHead('/pickup-special-offers');

  if (!data?.genericPage) {
    return null;
  }

  const metaData = data?.genericPage.metaData;

  return (
    <>
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.genericPage.featuredImage}
      />
      <SearchPageContainer isServer={isServer} isSpecialOfferPage isPickups />
    </>
  );
};
Page.getInitialProps = ({ query, req }) => {
  return { query, isServer: !!req };
};

export default withApollo(Page, { getDataFromTree });
