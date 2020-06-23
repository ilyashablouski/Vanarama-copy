import { getDataFromTree } from '@apollo/react-ssr';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ExpensesFormContainer from '../../../containers/ExpensesFormContainer/ExpensesFormContainer';
import OLAFLayout from '../../../layouts/OLAFLayout/OLAFLayout';
import withApollo from '../../../hocs/withApollo';
import { getUrlParam, OLAFQueryParams } from '../../../utils/url';

type QueryParams = OLAFQueryParams & {
  uuid: string;
};

const ExpensesPage: NextPage = () => {
  const router = useRouter();
  const { derivativeId, orderId, uuid } = router.query as QueryParams;
  return (
    <OLAFLayout>
      <ExpensesFormContainer
        onCompleted={() => {
          const params = getUrlParam({ derivativeId, orderId });
          const url =
            router.query.redirect === 'summary'
              ? `/olaf/summary/[uuid]${params}`
              : `/olaf/bank-details/[uuid]${params}`;

          router.push(url, url.replace('[uuid]', uuid));
        }}
        personUuid={uuid}
      />
    </OLAFLayout>
  );
};

export default withApollo(ExpensesPage, { getDataFromTree });
