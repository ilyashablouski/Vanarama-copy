import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import withApollo from '../../../hocs/withApollo';

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const {
    query: { uuid, derivativeId, orderId },
  } = router;
  return (
    <OLAFLayout
      orderId={orderId as string}
      derivativeId={derivativeId as string}
    >
      <SummaryFormContainer personUuid={uuid as string} />
    </OLAFLayout>
  );
};

export default withApollo(SummaryPage, { getDataFromTree });
