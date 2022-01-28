import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import SecureModalLayout from '../../../containers/SecureModalLayout';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import { OLAFQueryParams } from '../../../utils/url';
import { GetDerivative_derivative as IDerivative } from '../../../../generated/GetDerivative';
import { pushSummaryDataLayer } from '../../../utils/dataLayerHelpers';
import { OrderInputObject } from '../../../../generated/globalTypes';
import { useStoredOrderQuery } from '../../../gql/storedOrder';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  const { data: storedOrderData } = useStoredOrderQuery();
  const [detailsData, setDetailsData] = useState<OrderInputObject | null>(null);
  const [derivativeData, setDerivativeData] = useState<IDerivative | null>(
    null,
  );
  const personUuid =
    uuid || storedOrderData?.storedOrder?.order?.personUuid || '';

  const handleComplete = (emailAddress: string | undefined) => {
    router.push('/olaf/thank-you', '/olaf/thank-you').then(() =>
      setTimeout(() => {
        pushSummaryDataLayer({
          detailsData,
          derivativeData,
          orderId: storedOrderData?.storedOrder?.order?.uuid || '',
          emailAddress,
        });
      }, 200),
    );
  };

  return (
    <OLAFLayout
      setDetailsData={setDetailsData}
      setDerivativeData={setDerivativeData}
    >
      <SecureModalLayout>
        <SummaryFormContainer
          onComplete={handleComplete}
          personUuid={personUuid}
          orderId={storedOrderData?.storedOrder?.order?.uuid || ''}
        />
      </SecureModalLayout>
    </OLAFLayout>
  );
};

export default SummaryPage;
