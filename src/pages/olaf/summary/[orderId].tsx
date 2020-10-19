/* eslint-disable @typescript-eslint/camelcase */
import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import withApollo from '../../../hocs/withApollo';
import { OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history/[orderId]';
import { GetOlafData_orderByUuid } from '../../../../generated/GetOlafData';
import { GetDerivative_derivative } from '../../../../generated/GetDerivative';
import { pushSummaryDataLayer } from '../../../utils/dataLayerHelpers';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const { orderId, uuid } = router.query as QueryParams;
  const [
    detailsData,
    setDetailsData,
  ] = useState<GetOlafData_orderByUuid | null>(null);
  const [
    derivativeData,
    setDerivativeData,
  ] = useState<GetDerivative_derivative | null>(null);

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  const onComplete = (emailAddress: string | undefined) => {
    pushSummaryDataLayer({
      detailsData,
      derivativeData,
      orderId,
      emailAddress,
    });
  };

  return (
    <OLAFLayout
      setDetailsData={setDetailsData}
      setDerivativeData={setDerivativeData}
    >
      <SummaryFormContainer
        onComplete={onComplete}
        personUuid={personUuid}
        orderId={orderId}
      />
    </OLAFLayout>
  );
};

export default withApollo(SummaryPage, { getDataFromTree });
