import { NextPage, NextPageContext } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { GET_ABOUT_US_PAGE_DATA } from '../../containers/AboutUsPageContainer/gql';
import AboutUs, {
  IAboutPageProps,
} from '../../containers/AboutUsPageContainer/AboutUs';
import createApolloClient from '../../apolloClient';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Head from '../../components/Head/Head';

const AboutUsLandingPage: NextPage<IAboutPageProps> = ({
  data,
  loading,
  error,
}) => {
  const metaData = getSectionsData(['metaData'], data?.aboutUsLandingPage);
  const featuredImage = getSectionsData(
    ['featuredImage'],
    data?.aboutUsLandingPage,
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
      <AboutUs data={data} loading={loading} error={error} />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const client = createApolloClient({}, context);
  const { data, loading, errors } = await client.query({
    query: GET_ABOUT_US_PAGE_DATA,
  });
  return { props: { data, loading, error: errors || null } };
}

export default AboutUsLandingPage;
