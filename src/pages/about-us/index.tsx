import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { ApolloError } from '@apollo/client';
import { IPageWithData, IPageWithError, PageTypeEnum } from 'types/common';
import React, { useEffect, useState } from 'react';
import getPartnerProperties, {
  isPartnerSessionActive,
} from 'utils/partnerProperties';
import SchemaJSON from 'core/atoms/schema-json';
import { IBreadcrumb } from 'types/breadcrumbs';
import { GET_ABOUT_US_PAGE_DATA } from '../../containers/AboutUsPageContainer/gql';
import AboutUs, {
  IAboutPageProps,
} from '../../containers/AboutUsPageContainer/AboutUs';
import createApolloClient from '../../apolloClient';
import { getSectionsData } from '../../utils/getSectionsData';
import Breadcrumbs from '../../core/atoms/breadcrumbs-v2';
import Head from '../../components/Head/Head';
import { decodeData, encodeData } from '../../utils/data';
import {
  GetAboutUsPageData,
  GetAboutUsPageDataVariables,
} from '../../../generated/GetAboutUsPageData';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../utils/env';
import { convertErrorToProps } from '../../utils/helpers';
import { getServiceBannerData } from '../../utils/serviceBannerHelper';

type IProps = IPageWithData<IAboutPageProps>;

const AboutUsLandingPage: NextPage<IProps> = ({ data: encodedData }) => {
  const data = decodeData(encodedData);
  const metaData = getSectionsData(['metaData'], data?.aboutUsLandingPage);
  const featuredImage = getSectionsData(
    ['featuredImage'],
    data?.aboutUsLandingPage,
  );
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Check if partnership session is active to set partnership as home page link
  useEffect(() => {
    const breadcrumbsItems = metaData?.breadcrumbs?.map((el: IBreadcrumb) => ({
      link: { href: el.href || '', label: el.label },
    }));
    const partnerProperties = getPartnerProperties();
    const partnershipSessionActive = isPartnerSessionActive();
    if (partnerProperties && partnershipSessionActive) {
      breadcrumbsItems[0] = {
        link: {
          href: `/partnerships/${partnerProperties?.slug?.toLowerCase()}`,
          label: 'Home',
        },
      };
    }
    setBreadcrumbs(breadcrumbsItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {breadcrumbs && (
        <div className="row:title">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}
      <AboutUs data={data} />
      {metaData && (
        <>
          <Head metaData={metaData} featuredImage={featuredImage} />
          <SchemaJSON json={JSON.stringify(metaData.schema)} />
        </>
      )}
    </>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  const client = createApolloClient({});
  try {
    const [{ data: rawData }, { serviceBanner }] = await Promise.all([
      client.query<GetAboutUsPageData, GetAboutUsPageDataVariables>({
        query: GET_ABOUT_US_PAGE_DATA,
        variables: {
          isPreview: !!context?.preview,
        },
      }),
      getServiceBannerData(client),
    ]);

    // Obfuscate data from Googlebot
    const data = encodeData(rawData);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
        data,
        serviceBanner: serviceBanner || null,
      },
    };
  } catch (error) {
    const apolloError = error as ApolloError;
    const revalidate = DEFAULT_REVALIDATE_INTERVAL_ERROR;

    // handle graphQLErrors as 404
    // Next will render our custom pages/404
    if (apolloError?.graphQLErrors?.length) {
      return {
        notFound: true,
        revalidate,
      };
    }

    return {
      revalidate,
      props: {
        pageType: PageTypeEnum.ERROR,
        error: convertErrorToProps(error),
      },
    };
  }
}

export default AboutUsLandingPage;
