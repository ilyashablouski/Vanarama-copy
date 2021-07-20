import { NextPage } from 'next';
import SchemaJSON from 'core/atoms/schema-json';
import { PreviewNextPageContext } from 'types/common';
import { GET_ABOUT_US_PAGE_DATA } from '../../containers/AboutUsPageContainer/gql';
import AboutUs, {
  IAboutPageProps,
} from '../../containers/AboutUsPageContainer/AboutUs';
import createApolloClient from '../../apolloClient';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Head from '../../components/Head/Head';
import { encodeData, decodeData } from '../../utils/data';
import { useEffect, useState } from 'react';
import getPartnerProperties, { isPartnerSessionActive } from 'utils/partnerProperties';

const AboutUsLandingPage: NextPage<IAboutPageProps> = ({
  data: encodedData,
  loading,
}) => {
  // De-obfuscate data for user
  const data = decodeData(encodedData);
  const metaData = getSectionsData(['metaData'], data?.aboutUsLandingPage);
  const featuredImage = getSectionsData(
    ['featuredImage'],
    data?.aboutUsLandingPage,
  );
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Check if partnership session is active to set partnership as home page link
  useEffect(() => {
    const breadcrumbsItems = metaData?.breadcrumbs?.map((el: any) => ({
      link: { href: el.href || '', label: el.label },
    }));
    if (getPartnerProperties() && isPartnerSessionActive()) {
      breadcrumbsItems[0] = {
        link: {
          href: `/partnerships/${getPartnerProperties()?.slug?.toLowerCase()}`,
          label: 'Home',
        },
      };
    }
    setBreadcrumbs(breadcrumbsItems);
  }, []);

  return (
    <>
      {breadcrumbs && (
        <div className="row:title">
          <Breadcrumb items={breadcrumbs} />
        </div>
      )}
      <AboutUs data={data} loading={loading} />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(context: PreviewNextPageContext) {
  const client = createApolloClient({}, context);
  try {
    const { data: rawData, loading, errors } = await client.query({
      query: GET_ABOUT_US_PAGE_DATA,
      variables: {
        ...(context?.preview && { isPreview: context?.preview }),
      },
    });

    if (errors) {
      throw new Error(errors[0].message);
    }

    // Obfuscate data from Googlebot
    const data = encodeData(rawData);

    return {
      revalidate: context?.preview
        ? 1
        : Number(process.env.REVALIDATE_INTERVAL),
      props: { data, loading },
    };
  } catch (err) {
    throw new Error(err);
  }
}

export default AboutUsLandingPage;
