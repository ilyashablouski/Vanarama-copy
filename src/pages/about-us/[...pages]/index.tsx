import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import { ApolloError } from '@apollo/client';
import DefaultErrorPage from 'next/error';
import { GENERIC_PAGE } from '../../../gql/genericPage';
import SimplePageContainer from '../../../containers/SipmlePageContainer/SipmlePageContainer';
import createApolloClient from '../../../apolloClient';
import { GenericPageQuery } from '../../../../generated/GenericPageQuery';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import { getSectionsData } from '../../../utils/getSectionsData';
import { PAGE_COLLECTION } from '../../../gql/pageCollection';
import { getPathsFromPageCollection } from '../../../utils/pageSlugs';
import {
  PageCollection,
  PageCollectionVariables,
} from '../../../../generated/PageCollection';

interface IAboutUsPage {
  data: GenericPageQuery | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

const AboutUsPage: NextPage<IAboutUsPage> = ({ data, error }) => {
  if (error || !data) {
    return <DefaultErrorPage statusCode={404} />;
  }

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      <div className="row:title">
        <Breadcrumb items={breadcrumbsItems} />
      </div>
      <SimplePageContainer data={data} loading={!data} error={error} />
    </>
  );
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
    paths: getPathsFromPageCollection(items, 'about-us'),
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
    return {
      props: {
        data,
        error: errors ? errors[0] : null,
      },
    };
  } catch {
    return {
      props: {
        error: true,
      },
    };
  }
}

export default AboutUsPage;
