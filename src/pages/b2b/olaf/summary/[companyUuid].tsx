import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as toast from '@vanarama/uibook/lib/components/atoms/toast/Toast';
import OLAFLayout from '../../../../layouts/OLAFLayout/OLAFLayout';
import BusinessSummaryFormContainer from '../../../../containers/BusinessSummaryFormContainer/BusinessSummaryFormContainer';
import withApollo from '../../../../hocs/withApollo';
import useGetPersonUuid from '../../../../hooks/useGetPersonUuid';
import useSoleTraderJourney from '../../../../hooks/useSoleTraderJourney';

type QueryParams = {
  companyUuid: string;
  orderId: string;
};

const handleSubmitError = () =>
  toast.error(
    'Oops, an unexpected error occurred',
    'Your details could not be saved. Please try submitting the form again.',
  );

const BusinessSummaryPage: NextPage = () => {
  const router = useRouter();
  const { companyUuid, orderId } = router.query as QueryParams;
  const personUuid = useGetPersonUuid();
  const isSoleTrader = useSoleTraderJourney();

  const handleComplete = () =>
    router.push(
      '/olaf/thank-you/[orderId]?isB2b=1',
      '/olaf/thank-you/[orderId]?isB2b=1'.replace('[orderId]', orderId),
    );

  return (
    <OLAFLayout>
      <BusinessSummaryFormContainer
        isSoleTrader={isSoleTrader}
        onCompleted={handleComplete}
        onError={handleSubmitError}
        personUuid={personUuid}
        orderId={orderId}
        companyUuid={companyUuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(BusinessSummaryPage, { getDataFromTree });
