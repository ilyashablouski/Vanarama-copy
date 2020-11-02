import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import Loading from '@vanarama/uibook/lib/components/atoms/loading';
import withApollo from '../../../../hocs/withApollo';
import LeasingArticleContainer from '../../../../containers/LeasingArticleContainer/LeasingArticleContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../../gql/genericPage';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import createApolloClient from '../../../../apolloClient';
import { getLeasingPaths } from '../../../../utils/pageSlugs';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';

const FinanceInfo: NextPage<IGenericPage> = ({ data, loading, error }) => {
  if (loading) {
    return <Loading size="large" />;
  }
  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!data?.genericPage) {
    return null;
  }

  const title = getSectionsData(['metaData', 'name'], data?.genericPage);
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const featuredImage = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );

  return (
    <LeasingArticleContainer
      body={body}
      title={title}
      sections={sections}
      image={featuredImage}
    />
  );
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<GenericPageQuery>({
    query: GENERIC_PAGE,
    variables: {
      slug: 'guides/van-leasing-explained',
    },
  });

  return {
    paths: getLeasingPaths(data?.genericPage),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = createApolloClient({}, context as NextPageContext);
  const { data, loading, errors } = await client.query({
    query: GENERIC_PAGE,
    variables: {
      slug: `guides/van-leasing-explained/${context?.params?.explained}`,
    },
  });
  return {
    props: {
      data,
      loading,
      error: errors ? errors[0] : null,
    },
  };
}

export default withApollo(FinanceInfo);
