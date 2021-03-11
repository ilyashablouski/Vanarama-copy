import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import SimplePageContainer from '../../../containers/SimplePageContainer/SimplePageContainer';
import createApolloClient from '../../../apolloClient';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';

interface IAboutUsPage {
  data: GenericPageQuery | undefined;
  loading: boolean;
}

const AboutUsPage: NextPage<IAboutUsPage> = ({ data }) => {
  return <SimplePageContainer data={data} loading={!data} />;
};

export async function getStaticPaths() {
  const client = createApolloClient({});
  const { data } = await client.query<PageCollection, PageCollectionVariables>({
    query: PAGE_COLLECTION,
    variables: {
      pageType: 'About Us',
    },
  });
  const items = data?.pageCollection?.items;
  return {
    paths: getPathsFromPageCollection(items, 'about-us', [
      '/customer-testimonials',
    ]),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const client = createApolloClient({}, context as NextPageContext);
    const paths = context?.params?.pages as string[];

    const { data, errors } = await client.query({
      query: GENERIC_PAGE,
      variables: {
        slug: `about-us/${paths?.join('/')}`,
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default AboutUsPage;
