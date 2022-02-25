import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import * as toast from 'core/atoms/toast/Toast';
import { ApolloError } from '@apollo/client';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import { OLAFQueryParams } from '../../../../utils/url';
import CompanyDetailsFormContainer from '../../../../containers/CompanyDetailsFormContainer';
import SecureModalLayout from '../../../../containers/SecureModalLayout';
import { useStoredOrderQuery } from '../../../../gql/storedOrder';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import {
  IPageWithError,
  IPageWithoutData,
  PageTypeEnum,
} from '../../../../types/common';
import createApolloClient from '../../../../apolloClient';
import { getServiceBannerData } from '../../../../utils/serviceBannerHelper';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../../utils/env';
import { convertErrorToProps } from '../../../../utils/helpers';

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
    { dataTestId: 'company-details-error' },
  );

type QueryParams = OLAFQueryParams & {
  companyUuid: string;
};

export const CompanyDetailsPage: NextPage = () => {
  const router = useRouter();
  const personUuid = useGetPersonUuid();
  const { data } = useStoredOrderQuery();

  const { companyUuid, redirect } = router.query as QueryParams;
  const isEdited = !!router.query.redirect;

  const handleSubmitCompletion = (companyGuid: string) => {
    const url = redirect || `/b2b/olaf/vat-details/[companyUuid]`;
    return router.push(url, url.replace('[companyUuid]', companyGuid));
  };

  return (
    <OLAFLayout>
      <SecureModalLayout>
        <CompanyDetailsFormContainer
          companyUuid={companyUuid}
          personUuid={personUuid}
          orderId={data?.storedOrder?.order?.uuid || ''}
          onCompleted={handleSubmitCompletion}
          onError={handleSubmitError}
          isEdited={isEdited}
        />
      </SecureModalLayout>
    </OLAFLayout>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<GetStaticPropsResult<IPageWithoutData | IPageWithError>> {
  try {
    const client = createApolloClient({});

    const { serviceBanner } = await getServiceBannerData(client);

    return {
      revalidate: context?.preview ? 1 : DEFAULT_REVALIDATE_INTERVAL,
      props: {
        pageType: PageTypeEnum.DEFAULT,
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

export default CompanyDetailsPage;
