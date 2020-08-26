/* eslint-disable @typescript-eslint/camelcase */
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery, gql } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { SaveAddressHistoryMutation_createUpdateAddress } from '../../../../generated/SaveAddressHistoryMutation';
import { formValuesToInputCreditApplication } from '../../../mappers/mappersCreditApplication';
import {
  useCreateUpdateCreditApplication,
  useGetCreditApplicationByOrderUuid,
} from '../../../gql/creditApplication';

export const GET_PERSON_INFORMATION = gql`
  query GetOrderInformation {
    uuid @client
  }
`;

type QueryParams = OLAFQueryParams & {
  uuid?: string;
};

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const { orderId, uuid } = router.query as QueryParams;

  const [createUpdateCA] = useCreateUpdateCreditApplication(orderId, () => {});
  const creditApplication = useGetCreditApplicationByOrderUuid(orderId);

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onCompleteClick = (
    createUpdateAddress:
      | SaveAddressHistoryMutation_createUpdateAddress[]
      | null,
  ) => {
    createUpdateCA({
      variables: {
        input: formValuesToInputCreditApplication({
          ...creditApplication.data?.creditApplicationByOrderUuid,
          orderUuid: orderId,
          addresses: createUpdateAddress,
        }),
      },
    });
    const params = getUrlParam({ uuid });
    const url =
      router.query.redirect === 'summary'
        ? `/olaf/summary/[orderId]${params}`
        : `/olaf/employment-history/[orderId]${params}`;

    router.push(url, url.replace('[orderId]', orderId));
  };

  return (
    <OLAFLayout>
      <AddressFormContainer
        onCompleted={({ createUpdateAddress }) =>
          onCompleteClick(createUpdateAddress)
        }
        personUuid={personUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(AddressHistoryPage, { getDataFromTree });
