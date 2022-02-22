import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';
import { IServiceBanner } from 'core/molecules/service-banner/interfaces';
import ServiceBanner from 'core/molecules/service-banner';
import PasswordResetContainer from '../../../containers/PasswordResetContainer';
import withApollo from '../../../hocs/withApollo';
import Head from '../../../components/Head/Head';
import Skeleton from '../../../components/Skeleton';
import { IPageWithError, PageTypeEnum } from '../../../types/common';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';

const Heading = dynamic(() => import('core/atoms/heading'), {
  loading: () => <Skeleton count={1} />,
});

interface IProps {
  serviceBanner?: IServiceBanner;
}

const metaData = {
  canonicalUrl: null,
  legacyUrl: null,
  metaDescription: null,
  metaRobots: null,
  name: null,
  pageType: null,
  publishedOn: null,
  slug: null,
  title: 'Create New Password | Vanarama',
  schema: null,
  breadcrumbs: null,
};
export const PasswordResetPage: NextPage<IProps> = ({ serviceBanner }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const { query } = useRouter();

  useEffect(() => {
    setEmail(Array.isArray(query?.email) ? query.email[0] : query?.email);
    setCode(Array.isArray(query?.code) ? query.code[0] : query?.code);
  }, [query]);

  return (
    <>
      <ServiceBanner
        enable={serviceBanner?.enable}
        message={serviceBanner?.message}
        link={serviceBanner?.link}
      />
      <div className="row:title -mt-500">
        <Heading
          tag="h1"
          size="xlarge"
          color="black"
          dataTestId="reset-password"
        >
          Create New Password
        </Heading>
      </div>
      <div className="row:form">
        {code! && <PasswordResetContainer code={code!} username={email} />}
      </div>
      <Head metaData={metaData} featuredImage={null} />
    </>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IProps | IPageWithError>> {
  try {
    const client = createApolloClient({});

    const { serviceBanner } = await getServiceBannerData(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
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

export default withApollo(PasswordResetPage);
