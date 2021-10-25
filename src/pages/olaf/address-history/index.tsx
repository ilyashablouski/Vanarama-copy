import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { SaveAddressHistoryMutation_createUpdateAddress as IAddress } from '../../../../generated/SaveAddressHistoryMutation';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { useStoredPersonUuidQuery } from '../../../gql/storedPersonUuid';
import { useStoredOrderQuery } from '../../../gql/storedOrder';

type QueryParams = OLAFQueryParams & {
  uuid?: string;
};

const AddressHistoryPage: NextPage = () => {
  const router = useRouter();
  const { uuid, redirect } = router.query as QueryParams;
  const { data: storedOrderData } = useStoredOrderQuery();

  const [createUpdateCA] = useCreateUpdateCreditApplication();
  const { data } = useStoredPersonUuidQuery();
  const personUuid = uuid || data?.storedPersonUuid || '';

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
      <AddressFormContainer
        personUuid={personUuid}
        onCompleted={({ createUpdateAddress }) =>
          onCompleteClick(createUpdateAddress)
        }
      />
    </OLAFLayout>
  );
};

export default withApollo(AddressHistoryPage, { getDataFromTree });
