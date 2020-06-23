import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import withApollo from '../../../hocs/withApollo';

type QueryParams = {
  uuid: string;
};

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const { uuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <SummaryFormContainer personUuid={uuid} />
    </OLAFLayout>
  );
};

export default withApollo(SummaryPage, { getDataFromTree });
