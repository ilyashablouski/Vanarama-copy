import { GetStaticPropsContext, GetStaticPropsResult, NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { ApolloError } from '@apollo/client';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { SaveAddressHistoryMutation_createUpdateAddress as IAddress } from '../../../../generated/SaveAddressHistoryMutation';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { useStoredOrderQuery } from '../../../gql/storedOrder';
import {
  IPageWithError,
  IPageWithoutData,
  PageTypeEnum,
} from '../../../types/common';
import createApolloClient from '../../../apolloClient';
import { getServiceBannerData } from '../../../utils/serviceBannerHelper';
import {
  DEFAULT_REVALIDATE_INTERVAL,
  DEFAULT_REVALIDATE_INTERVAL_ERROR,
} from '../../../utils/env';
import { convertErrorToProps } from '../../../utils/helpers';

type QueryParams = OLAFQueryParams & {
  uuid?: string;
};

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const { uuid, redirect } = router.query as QueryParams;
  const [createUpdateCA] = useCreateUpdateCreditApplication();

  const { data: storedOrderData } = useStoredOrderQuery();
  const personUuid = useMemo(
    () => uuid || storedOrderData?.storedOrder?.order?.personUuid || '',
    [storedOrderData?.storedOrder?.order?.personUuid, uuid],
  );

  const onCompleteClick = (createUpdateAddress: IAddress[] | null) => {
    createUpdateCA({
      variables: {
        input: {
          orderUuid: storedOrderData?.storedOrder?.order?.uuid || '',
          addresses: createUpdateAddress,
        },
      },
    })
      .then(() => getUrlParam({ uuid }))
      .then(params => redirect || `/olaf/employment-history${params}`)
      .then(url => router.push(url, url));
  };

  return (
    <OLAFLayout>
      <SecureModalLayout>
        <AddressFormContainer
          isEdit={!!redirect}
          personUuid={personUuid}
          onCompleted={data => onCompleteClick(data?.createUpdateAddress)}
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

export default AddressHistoryPage;
