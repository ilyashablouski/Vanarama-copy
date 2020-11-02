import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import DefaultErrorPage from 'next/error';
import LeasingArticleContainer from '../../../../containers/LeasingArticleContainer/LeasingArticleContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../../gql/genericPage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import createApolloClient from '../../../../apolloClient';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';
import { getLeasingPaths } from '../../../../utils/pageSlugs';

const FinanceInfo: NextPage<IGenericPage> = ({ data, error }) => {

  if (error || !data?.genericPage) {
    return <DefaultErrorPage statusCode={404} />;
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
      slug: 'guides/car-leasing-explained',
    },
  });

  return {
    paths: getLeasingPaths(data?.genericPage),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `guides/van-leasing-explained/${context?.params?.explained}`,
      },
    });
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch (e) {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default FinanceInfo;
