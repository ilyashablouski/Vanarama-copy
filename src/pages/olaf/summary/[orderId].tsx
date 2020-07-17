import { getDataFromTree } from '@apollo/react-ssr';
import { useQuery } from '@apollo/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import SummaryFormContainer from '../../../containers/SummaryFormContainer/SummaryFormContainer';
import withApollo from '../../../hocs/withApollo';
import { OLAFQueryParams } from '../../../utils/url';
import { GET_PERSON_INFORMATION } from '../address-history/[orderId]';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const { orderId, uuid } = router.query as QueryParams;

  let personUuid = uuid || '';
  const { data } = useQuery(GET_PERSON_INFORMATION);
  if (data?.uuid) {
    personUuid = data.uuid;
  }

  return (
    <OLAFLayout>
      <SummaryFormContainer personUuid={personUuid} orderId={orderId} />
    </OLAFLayout>
  );
};

export default withApollo(SummaryPage, { getDataFromTree });
