import { NextPage } from 'next';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from '../../hocs/withApollo';
import SearchPageContainer from '../../containers/SearchPageContainer';
import Head from '../../components/Head/Head';
import { useAllMakePage } from '../../containers/SearchPageContainer/gql';

interface IProps {
  isServer: boolean;
}

const Page: NextPage<IProps> = ({ isServer }) => {
  const { data } = useAllMakePage();

  if (!data?.manufacturerPage) {
    return null;
  }

  const metaData = data?.manufacturerPage.metaData;
  const section = data?.manufacturerPage.sections;

  return (
    <>
      <Head
        title={metaData.title || ''}
        metaDescription={metaData.metaDescription}
        metaRobots={metaData.metaRobots}
        legacyUrl={metaData.legacyUrl}
        publishedOn={metaData.publishedOn}
        featuredImage={data?.manufacturerPage.featuredImage}
      />
      <SearchPageContainer
        isServer={isServer}
        isCarSearch
        isAllMakesPage
        topInfoSection={section || undefined}
        pageTitle={metaData.title || undefined}
      />
    </>
  );
};
Page.getInitialProps = ({ query, req }) => {
  return { query, isServer: !!req };
};

export default withApollo(Page, { getDataFromTree });
