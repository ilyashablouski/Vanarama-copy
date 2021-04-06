import { GetStaticPropsContext, NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import LeasingArticleContainer from '../../../../containers/LeasingArticleContainer/LeasingArticleContainer';
import { GENERIC_PAGE, IGenericPage } from '../../../../gql/genericPage';
import { getSectionsData } from '../../../../utils/getSectionsData';
import createApolloClient from '../../../../apolloClient';
import { GenericPageQuery } from '../../../../../generated/GenericPageQuery';
import { getLeasingPaths } from '../../../../utils/pageSlugs';
import Breadcrumb from '../../../../components/Breadcrumb/Breadcrumb';
import Head from '../../../../components/Head/Head';
import { decodeData, encodeData } from '../../../../utils/data';

const FinanceInfo: NextPage<IGenericPage> = ({ data: encodedData }) => {
  // De-obfuscate data for user
  const data = decodeData(encodedData);

  const metaData = getSectionsData(['metaData'], data?.genericPage);
  const featuredImage = getSectionsData(['featuredImage'], data?.genericPage);
  const title = metaData.name;
  const sections = getSectionsData(['sections'], data?.genericPage);
  const body = getSectionsData(['body'], data?.genericPage);
  const featuredImageUrl = getSectionsData(
    ['featuredImage', 'file', 'url'],
    data?.genericPage,
  );
  const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
    link: { href: el.href || '', label: el.label },
  }));

  return (
    <>
      {breadcrumbsItems && (
        <div className="row:title">
          <Breadcrumb items={breadcrumbsItems} />
        </div>
      )}
      <LeasingArticleContainer
        body={body}
        title={title}
        sections={sections}
        image={featuredImageUrl}
      />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
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
        slug: `guides/car-leasing-explained/${context?.params?.explained}`,
      },
    });
    if (errors) {
      throw new Error(errors[0].message);
    }
    return {
      revalidate: Number(process.env.REVALIDATE_INTERVAL),
      props: {
        data: encodeData(data),
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default FinanceInfo;
