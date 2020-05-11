import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OLAFContainer from '../../../containers/OLAFContainer/OLAFContainer';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import withApollo from '../../../hocs/withApollo';

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const uuid = router.query.uuid as string;
  return (
    <OLAFContainer>
      <SummaryFormContainer personUuid={uuid} />
    </OLAFContainer>
  );
};

export default withApollo(SummaryPage, { getDataFromTree });
