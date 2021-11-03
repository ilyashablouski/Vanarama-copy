import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import AddressFormContainer from '../../../containers/AddressFormContainer/AddressFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';
import { SaveAddressHistoryMutation_createUpdateAddress as IAddress } from '../../../../generated/SaveAddressHistoryMutation';
import { useCreateUpdateCreditApplication } from '../../../gql/creditApplication';
import { useStoredOrderQuery } from '../../../gql/storedOrder';
import { isBrowser } from '../../../utils/deviceType';

type QueryParams = OLAFQueryParams & {
  uuid?: string;
};

const AddressHistoryPage: NextPage = () => {
  console.log('PAGE');
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
      <AddressFormContainer
        personUuid={personUuid}
        onCompleted={({ createUpdateAddress }) =>
          onCompleteClick(createUpdateAddress)
        }
      />
    </OLAFLayout>
  );
};

export default AddressHistoryPage;
